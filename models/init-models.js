const DataTypes = require("sequelize").DataTypes;
const _USERS = require("./users");;


function initModels(sequelize) {
    const USERS = _USERS(sequelize, DataTypes);
    
    USERS.hasMany(AVAILABLE_CURRENCIES, { as: "available_currencies", foreignKey: "updated_by_id"});
    USERS.hasMany(TRANSACTION_BILLING_ITEMS, { foreignKey: "doctor_id" });

    USERS.hasMany(PATIENT_WALLET_HISTORIES, { as: "patient_wallet_histories", foreignKey: "received_by_id" });
    USERS.hasMany(PATIENT_WALLET_HISTORIES, { as: "patient_wallet_histories_doctor", foreignKey: "doctor_id" });
    USERS.hasMany(PATIENT_WALLETS, { as: "patient_wallets", foreignKey: "patient_id" });
    USERS.hasMany(HRMS_EMPLOYEE_DEPARTMENT, { foreignKey: "created_by_id"});
    return {
        USERS
    }
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
