const DataTypes = require("sequelize").DataTypes;
const fs = require('fs');
const path = require('path');

/**
 * Require all JavaScript files in the current directory, excluding specific files.
 * @returns {Object} An object containing required modules with their filenames as keys.
 */
const requireAllFilesInCurrentDirectory = () => {
    // Get the current directory path
    const currentDirectory = __dirname;

    // Read all files in the current directory
    const files = fs.readdirSync(currentDirectory);

    // Object to store required modules
    const requiredFiles = {};

    // Iterate over each file in the directory
    files.forEach((file) => {
        // Check if the file is a JavaScript file and not excluded
        if (file.endsWith('.js') && file !== 'init-models.js' && file !== 'db-models.js', file !== 'database.js') {
            // Extract the filename without extension
            const fileName = path.parse(file).name;

            // Require the module and add it to the requiredFiles object
            requiredFiles[`_${fileName.toUpperCase()}`] = require(path.join(currentDirectory, file));
        }
    });

    // Return the object containing required modules
    return requiredFiles;
};

const MODELS = requireAllFilesInCurrentDirectory();

const initModels = function (sequelize) {

    const ADDRESSES = MODELS._ADDRESSES(sequelize, DataTypes);
    const USERS = MODELS._USER(sequelize, DataTypes);

    USERS.hasOne(ADDRESSES, {as: "addresses", foreignKey: "address_id"});


    return {
        USERS,
        ADDRESSES
    }
}

console.log("initModels ===>", initModels)
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
