'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const database = require('../config/config.js').databasesConfig;
const db = {};

/**
* Database connection
*/
const sequelize = new Sequelize(database.databaseName, database.userName, database.databasePassword, {
  logging : false,
  host    : database.host,
  port: database.port,
  dialect : database.dialect,
  retry: {
    match: [
      /Deadlock/i,
      Sequelize.ConnectionError,
      Sequelize.ConnectionTimedOutError,
      Sequelize.TimeoutError,
      'SQLITE_BUSY',
      ],
    max: 3, // Maximum rety 3 times
    backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
    backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1,
    name: 'Database',
    report: reportDatabaseRetry
  }
});

function reportDatabaseRetry(message, database) {
  if(database.$current > 1) console.log(`WARNING: ${database.name} retry #${database.$current} due to some reason: ${ new Date().toISOString() }`);
}

/**
 * In test mode it clears all data of test database
 */
if (process.env.NODE_ENV === 'testing') sequelize.sync({ truncate: true, force: true, logging: false });

/**
 * Check database connection
 */
sequelize.authenticate()
    .then(() => console.log("Database Connected"))
    .catch((err) => { console.log("Database Error : ", err); process.exit(0)});

module.exports = sequelize;
