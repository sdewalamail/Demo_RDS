const {USERS} = require('../models/db-models')

class Repository_Users {

    async create(data) {
        try {
            const user = await USERS.create(data);
            return user;
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            console.log("Something went wrong on repository layer Repository_Users() ===>");
            throw error;
        }
    };

    async destroy(userId) {
        try {
            await USERS.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    };

    async getById(userId) {
        try {
            const user = await USERS.findByPk(userId, {
                attributes: ['email', 'id']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    };

    async getByEmail(userEmail) {
        try {
            const user = await USERS.findOne({
                where: {
                    email: userEmail
                }
            });
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    };

    async isAdmin(userId) {
        try {
            const user = await USERS.scope('admin').findByPk(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    };


}