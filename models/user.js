'use strict';
const Sequelize = require('sequelize');

const {USER_TYPE} = require('../utils/enums')

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('USERS',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true
            },
            user_type: {
                type: DataTypes.STRING(30),
                allowNull: true
            },
            country_code: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            mobile_no: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            platform: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            first_name: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            middle_name: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            last_name: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            encrypted_password: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            reset_password_token: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            reset_password_sent_at: {
                type: DataTypes.DATE,
                allowNull: true
            },
            mobile_otp: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            is_verified: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            is_approved: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            is_deleted: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            address_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'addresses',
                    key: 'id'
                }
            },
            is_terms_accepted: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            terms_accepted_on: {
                type: DataTypes.DATE,
                allowNull: true
            },
            password_updated_on: {
                type: DataTypes.DATE,
                allowNull: true
            },
            otp_generated_on: {
                type: DataTypes.DATE,
                allowNull: true
            },
            otp_secret_key: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true
            },
            device_token: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            authentication_token: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            time_zone: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            primary_language: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            secondary_language: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            member_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
            },
            is_walkin: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            connected_on: {
                type: DataTypes.DATE,
                allowNull: true
            },
            offline_added_by_id: {
                type: DataTypes.BIGINT,
                allowNull: true
            },
            fingerprint: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            is_profile_updated: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            previous_mobile_number: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            is_admin: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            is_demo: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            trail_expire_on: {
                type: DataTypes.DATE,
                allowNull: true
            },
            premium_expire_on: {
                type: DataTypes.DATE,
                allowNull: true
            },
            is_premium_acc: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            is_card_verified: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            email_otp: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            previous_email: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            is_mobile_verified: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            is_email_verified: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            email_otp_secret_key: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            is_uid_complete: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            is_deactivated: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            email_otp_generated_on: {
                type: DataTypes.DATE,
                allowNull: true
            },
            is_ai_enabled: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 0
            },
            is_adhoc_doc: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 0
            },
            is_testing: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            },
            alternate_mobile_no: {
                type: DataTypes.STRING(255),
                allowNull: true
            }
        },
        {
            scopes: {
                user: {
                    where: {
                        user_type: USER_TYPE._USER
                    }
                },
                admin: {
                    where: {
                        user_type: USER_TYPE._ADMIN
                    }
                },
                super_admin: {
                    where: {
                        user_type: USER_TYPE._SUPER_ADMIN
                    }
                }
            },
            sequelize,
            tableName: 'users',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        {name: "id"}
                    ]
                },
                {
                    name: "index_users_on_id",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        {name: "id"}
                    ]
                },
                {
                    name: "index_users_on_address_id",
                    using: "BTREE",
                    fields: [
                        {name: "address_id"}
                    ]
                },
                {
                    name: "index_users_on_user_type",
                    using: "BTREE",
                    fields: [
                        {name: "user_type"},
                    ]
                }
            ]
        });
    return User
};


// // Second way of defining model

//const { Model } = require('sequelize');

//module.exports = (sequelize, DataTypes) => {
//  class User extends Model {
//    /**
//     * Helper method for defining associations.
//     * This method is not a part of Sequelize lifecycle.
//     * The `models/index` file will call this method automatically.
//     */
//    static associate(models) {
//      // define association here
//    }
//  }
//  User.init({
//    firstName: DataTypes.STRING,
//    lastName: DataTypes.STRING,
//    email: DataTypes.STRING
//  }, {
//    sequelize,
//    modelName: 'User',
//  });
//  return User;
//};
