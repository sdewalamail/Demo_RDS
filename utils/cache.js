const { client } = require('./redisHelpler');

/**
 * Clear whole redis DB OR cached data
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {function} next Callback function
 */
exports.clearCache = async (req, res, next) => {
    try {
        if (!client.isOpen) client.connect();
        const data = await client.keys('[^bull]*');
        if (data.length > 0) client.del(data);
        return res.sendJson(200, "All cache cleared successfully");
    }
  catch (error) { next(error); }
}

/**
 * Get all cache keys
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
exports.getCacheKeys = async (req, res, next) => {
    try {
        let { key } = req.query;

        if (!client.isOpen) client.connect();
        key = key ? `${key}*` : "*";
        const data = await client.keys(key);

        return res.sendJson(200, "All keys", data);
    } catch (error) {
        next(error);
    }
}

/**
 * Clear particular cache
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {function} next Callback function
 */
exports.clearKeyCache = async (req, res, next) => {
    try {
        if (!client.isOpen) client.connect();
        const data = await client.keys(`${req.body.url}*`);
        if (data.length > 0) await client.del(data);
        return res.sendJson(200, "Cache cleared successfully");
    }
  catch (error) { next(error); }
}
