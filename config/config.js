require('dotenv').config()
module.exports = {
    databasesConfig: (process.env.NODE_ENV === "testing" ? {
        username: "root",
        password: null,
        databaseName: "database_development",
        host: "127.0.0.1",
        dialect: "mysql"
    } : {
        databaseName: process.env.DATABASE_NAME,
        userName: process.env.DATABASE_USER,
        databasePassword: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port:  process.env.DATABASE_PORT,
        host_slave_1: process.env.DATABSE_HOST_SLAVE_1,
        host_slave_2: process.env.DATABSE_HOST_SLAVE_2,
        dialect:  process.env.DIALECT,
        test: process.env.DATABASE_TEST
    }),
    is_db_logging: process.env.IS_DB_LOGGING,
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
}
