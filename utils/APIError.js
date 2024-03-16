/**
 * @extends Error
 */
class ExtendableError extends Error {
    constructor({message, errors, status, isPublic, stack, data}) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errors = errors;
        this.status = status;
        this.isPublic = isPublic;
        this.stack = stack;
        this.data = typeof data === 'string' ? [data] : data;
    }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */

class APIError extends ExtendableError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor({message, errors, status = 500, isPublic = true, stack, data}) {
        super({message, errors, status, isPublic, stack, data});
    }
}

module.exports = APIError;

//use Exmple --> throw new APIError({ status: 404, data: "Invalid id." });