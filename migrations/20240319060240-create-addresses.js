'use strict';
const { DataTypes} = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('addresses', {
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
                    allowNull: true
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
            }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('addresses');
    }
};