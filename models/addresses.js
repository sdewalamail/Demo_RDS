'use strict';

const Sequelize = require('sequelize');
const {ADDRESS_TYPE} = require('../utils/enums');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ADDRESSES',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true
            },
            address1: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            city: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            state: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            country: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            zipcode: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            latitude: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            longitude: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            address_type: {
                type: DataTypes.TINYINT,
                allowNull: true,
                get() {
                    if (!this.getDataValue('address_type')) return this.getDataValue('address_type');
                    else {
                        for (const data of Object.values(ADDRESS_TYPE)) {
                            if (data.key === this.getDataValue('address_type')) return data.value;
                        }
                    }
                }
            },
            is_deleted: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true
            },
            fingerprint: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            house_no: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            street_address: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'addresses',
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
                    name: "idx_addresses_is_deleted_city_state_country",
                    using: "BTREE",
                    fields: [
                        {name: "is_deleted"},
                        {name: "city", length: 255},
                        {name: "state", length: 255},
                        {name: "country", length: 255},
                    ]
                },
            ]
        });
};


//const {
//  Model
//} = require('sequelize');
//module.exports = (sequelize, DataTypes) => {
//  class ADDRESSES extends Model {
//    /**
//     * Helper method for defining associations.
//     * This method is not a part of Sequelize lifecycle.
//     * The `models/index` file will call this method automatically.
//     */
//    static associate(models) {
//      // define association here
//    }
//  }
//  ADDRESSES.init({
//    address1: DataTypes.STRING,
//    city: DataTypes.STRING
//  }, {
//    sequelize,
//    modelName: 'ADDRESSES',
//  });
//  return ADDRESSES;
//};