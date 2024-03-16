const { default_per_page_record, whatsApp, secret, fb_cloud } = require('../config');
const APIError = require('./APIError');

const path = require('path');
const crypto = require('crypto');
const cryptoJS = require("crypto-js");
const moment = require('moment');
const axios = require('axios');
const FormData = require('form-data');

const redisClient = require('./redisHelpler');

/**
 * @param {*} json convert json object to javascript object
 */
exports.toObject = (json) => JSON.parse(JSON.stringify(json));

/**
 * Test case response required check
 */
exports.parsedData = (res) => JSON.parse(res.text);

/**
 *
 * @param {*} string string who's first letter we want as capitalize
 */
exports.capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

/**
 * Remove fields from response object
 * @param {*} obj
 * @param {*} keys
 * @param {*} defaultFields
 */
exports.removeFields = (obj, keys, defaultFields = true) => {
    let isObject = false;
    if (!(obj instanceof Array)) isObject = true;

    obj = obj instanceof Array ? obj : [obj];
    keys = typeof keys === "string" ? [keys] : keys || [];

    if (defaultFields) keys = this.excludeFields(keys);

    obj.forEach(data => {
        keys.forEach(key => {
            if (data.dataValues) delete data.dataValues[key];
            else delete data[key];
        });
    });

    if (isObject) return obj[0];
    return obj;
}

/**
 * Exclude fields form find methods
 */
exports.excludeFields = (keys, isDefault = true) => {
    keys = typeof keys === "string" ? [keys] : keys || [];
    const defaultFields = ['is_deleted', 'updated_at', 'deleted_at', 'fingerprint'];
    if (isDefault) keys = keys.concat(defaultFields);
    return keys;
}

/**
 * Generate custom joi message
  @param {} data pass the filed name which we validate
 */
exports.errorMessage = (data, message = null, min = null, max = null) => {
    return {
        'string.base': message ? `${data} ${message}` : `${data} must be a string.`,
        'string.pattern.base': message ? `${data} ${message}` : `${data} invalid.`,
        'string.empty': message ? `${data} ${message}` : `${data} can't be blank.`,
        'any.required': message ? `${data} ${message}` : `${data} can't be blank.`,
        'string.alphanum': message ? `${data} ${message}` : `${data} must only contain alpha-numeric characters.`,
        'number.max': message ? `${data} ${message}` : `${data} must be less than or equal to ${max}.`,
        'number.min': message ? `${data} ${message}` : `${data} must be greater than or equal to ${min}.`,
        'number.base': message ? `${data} ${message}` : `${data} must be a number.`,
        'array.base': message ? `${data} ${message}` : `${data} must be an array.`,
        'any.only': message ? `${data} ${message}` : `${data} is not included in list.`,
        'array.length': message ? `${data} ${message}` : `${data} must contains items.`,
        'string.email': message ? `${data} ${message}` : `${data} must be valid.`,
        'array.sparse': message ? `${data} ${message}` : `${data} must not be a sparse array item.`,
            // 'string.max': message ? `${data} ${message}` : `${data} length must be less than or equal to 120 characters long.`,
        'array.includesRequiredUnknowns': message ? `${data} ${message}` : `${data} required parameter missing.`,
        'date.greater': message ? `${data} ${message}` : `${data} must be greater than ${new Date().toISOString()}`,
        'date.max': message ? `${data} ${message}` : `${data} invalid .`,
        'number.integer': message ? `${data} ${message}` : `${data} must be an integer.`,
        'date.base': message ? `${data} ${message}` : `${data} please enter valid date.`,
        'string.max': message ? `${data} ${message}` : `${data} length must be less than or equal to ${max} characters long.`,
        'string.min': message ? `${data} ${message}` : `${data} length must be greater than or equal to ${min} characters long.`,
        'string.uri': message ? `${data} ${message}` : `${data} must be a valid url.`
    };
}

/**
 * Return pagination params
 * @param currentPage Current page number
 * @param count Total number of records
 * @param perPage Number of record you want in single page
 */
exports.paginate = ({ currentPage = 1, count = 0, perPage = default_per_page_record }) => {
    currentPage = Number(currentPage);
    const pageCount = count != 0 ? Math.ceil(count / Number(perPage)) : 1;
    const offset = (currentPage ? Number(currentPage) - 1 : 0) * Number(perPage);
    const limit = Number(perPage);
    return { currentPage, pageCount, offset, limit, perPage };
};



/**
 * validate attachment extensions and size
 * @param {*} file
 */
exports.validAttachment = (file) => {
    const ext = path.parse(file.originalname).ext.match(FILE_EXTENSIONS.EXT_ATTACHMENTS);
    if (ext) {
        switch (ext[1]) {
            case 'png': case 'jpeg': case 'jpg': case 'PNG': case 'JPEG': case 'JPG':
                if (file.size > IMAGE_SIZE.BYTES) throw new APIError({ status: 422, data: 'Image size should be less than 10 MB' });
                break;
                case 'doc': case 'docx': case 'pdf': case 'csv': case 'txt': case 'xls': case 'xlsx': case 'DOC': case 'DOCX': case 'PDF': case 'CSV': case 'TXT': case 'XLS': case 'XLSX':
                    if (file.size > FILE_SIZE.BYTES) throw new APIError({ status: 422, data: 'File size should be less than 3 MB' });
                    break;
                    case 'mp4': case 'mkv': case 'mov': case 'avi': case 'wmv': case 'webm': case 'MP4': case 'MKV': case 'MOV': case 'AVI': case 'WMV': case 'WEBM':
                        if (file.size > VIDEO_SIZE.BYTES) throw new APIError({ status: 422, data: 'Video size should be less than 50 MB' });
                        break;
                        default:
                            throw new APIError({ status: 422, data: 'Please select jpg, png, pdf, doc, xls, text, csv files only' });
        }
    }
  else throw new APIError({ status: 422, data: 'Please select jpg, png, pdf, doc, xls, text, csv files only' });
}


/**
 *  Get age for given birthdate billing excel
 * @param {string} birthdate
 * @param {string} format of the date
 */
exports.getAge = (birthdate, format) => {
    if(format)
        birthdate = moment(birthdate, format);
    else 
        birthdate = moment(birthdate);

    const today = moment(new Date());

    if (today.diff(birthdate, 'years') > 0) return String(today.diff(birthdate, 'years')).concat(' Year(s)');
    else if (today.diff(birthdate, 'months') > 0) return String(today.diff(birthdate, 'months')).concat(' Month(s)');
    else return String(today.diff(birthdate, 'days')).concat(' Day(s)');
}

/**
 * Convert date in to ISO format
 * @param {*} date
 */
exports.convertToISODate = (date) => {
    if (patterns.isISODate.test(date)) return date;
    else if (moment(date, "DD-MM-YYYY", true).isValid()) return new Date(moment(date, "DD-MM-YYYY")).toISOString();
    else if (moment(date, "DD/MM/YYYY", true).isValid()) return new Date(moment(date, "DD/MM/YYYY")).toISOString();
    else if (moment(date, "YYYY/MM/DD", true).isValid()) return new Date(moment(date, "YYYY/MM/DD")).toISOString();
    else if (moment(date, "YYYY-MM-DD", true).isValid()) return new Date(moment(date, "YYYY-MM-DD")).toISOString();
    else if (/UTC/.test(date)) return new Date(date).toISOString();
}




/**
 * Generate UUID
 */
exports.generateUuid = (filed, generateGuestUid = 0) => {
    const hashStringType = generateGuestUid ? 'md5' : 'sha256';
    // Generate uid key
    const data = [];
    for (const key of filed) {
        if (filed[0] === key) data.push(key);
        else data.push(key.toString().toLowerCase());
    }
    const uidKey = `${data.join("|")}`;
    // Generate hex using uidKey
    const uid = crypto.createHash(hashStringType).update(uidKey).digest('hex');
    return uid;
}

/**
 * Generate UUID
 * Generate grid numbers in range
 * @param {number} min Minimum value of grid
 * @param {number} max Maximum value of grid
 * @param {number} n Number of value you want
 * @param {array} val Array of number
 */
exports.generateRandomNumber = (min, max, n, val = []) => {
    if (n) {
        const number = Math.ceil(Math.random() * (max - min) + min);
        n--;
        val.push(number);
        this.generateRandomNumber(min, max, n, val);
    }
    return val;
};


/** 
 * Encrypt plain text
 * @param { String } plainText
 * @returns encryptedText
 */
exports.encryptText = (plainText) => {
    const salt = cryptoJS.lib.WordArray.random(128 / 8);
    const key = cryptoJS.PBKDF2(secret, salt, { keySize: 256 / 32, iterations: 1000 });
    const encrypted = cryptoJS.AES.encrypt(plainText, key, { iv: salt });
    return salt.toString() + encrypted.toString();
}

/**
 * Decrypt encrypted text
 * @param { String } encryptedText
 * @returns decryptedText
 */
exports.decryptedText = (encryptedText) => {
    const salt = cryptoJS.enc.Hex.parse(encryptedText.substring(0, 32));
    const encrypted = encryptedText.substring(32);
    const key = cryptoJS.PBKDF2(secret, salt, { keySize: 256 / 32, iterations: 1000 });
    const decrypted = cryptoJS.AES.decrypt(encrypted, key, { iv: salt });
    return decrypted.toString(cryptoJS.enc.Utf8);
}

/**
   * Call AXIOS POST api with payload and headers
   * @param {string} url Which url data want to get
   * @param {object} payload Which payload want to pass in url
   * @param {object} header Which headers want to pass in header
   * @param {string} api_type Which type of api want to call.Default is POST. If need to call other method then pass methode
   * @param {number} pass_cm_id If need attach to X-CM-ID in header then pass 1
   * @param {number} responseType If need get reponseType in buffer then pass 1
   */
exports.axiosRequest = async (url, payload, header, api_type = API_METHOD.POST, pass_cm_id = 0, responseType = 0) => {

    const headers = { "Content-Type": "application/json", "User-Agent": "no axios" }

    const headerObj = {
        'x-token': 'X-Token',
        'authorization': 'Authorization',
        'X-Auth-Token': 'X-AUTH-TOKEN',
        'X-Hip-Id': 'X-HIP-ID'
    }

    for (const [key, value] of Object.entries(headerObj)) {
        if (header[key]) headers[value] = header[key]
    }

    if (pass_cm_id) headers['X-CM-ID'] = process.env.NODE_ENV === 'production' ? 'abdm' : 'sbx';

    return (api_type == API_METHOD.GET) ?
    axios[api_type](url, { headers, responseType: responseType ? "arraybuffer" : "json" }) :
    axios[api_type](url, payload, { headers })
}



/**
* Convert error and response message
* @param {object} err Error object
*/
exports.convertedError = (err, msg) => {

    if (!err?.isAxiosError || !err?.response) return err

    const { status, statusText, data } = err.response
    const errorData = {
        abha: 1,
        status: status || 500,
        message: data?.message || data.error?.message || statusText || msg || "Some technical issue from abdm side",
        data: (Array.isArray(data?.details) ? data.details.map(ele => ele.message) : data?.details?.message) || []
    }

    return errorData
}



exports.addCommaToNumber = (number) => Number(number).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });