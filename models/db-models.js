const sequelize = require('./database');
const initModels  = require('./init-models.js');
const { is_db_logging } = require('../config/config');
const { pagination, updateFingerprint, getRecordById } = require('../utils/dbHelper');

/**
* Initialize all models and pass sequelize connection object
*/

const db = initModels(sequelize);

/**
* Add operation entry in versions table
* @param {*} Object
*/
const addVersion = async(model, event, options) => {
    if (is_db_logging === "true") {
        const data = { item_type: model.constructor.name, item_id: model.id, event: event, whodunnit: options.id, ip: options.ip_address, object: JSON.stringify(model.dataValues), request_id: options['correlation-id'] };
        if (event === "update") {
            data['object_changes'] = JSON.stringify(model.dataValues);
            data['object'] = JSON.stringify(options.previousObject);
        }
        await db.VERSIONS.create(data, { hooks: false });
    }
}

/**
 * Add after create hook globally
 */
sequelize.addHook('afterCreate', async(model, options) => {
    await updateFingerprint(model);
    addVersion(model, 'create', options);
})

/**
* Add after update hook globally
*/
sequelize.addHook('afterUpdate', async(model, options) => {
    await updateFingerprint(model);
    addVersion(model, 'update', options);
})

/**
 * Append common methods to all models
 */
Object.keys(db).map(key => {
    db[key].pagination = pagination;
    db[key].getRecordById = getRecordById
});

module.exports = db;
