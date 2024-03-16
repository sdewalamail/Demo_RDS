const redis = require('redis');
const { redis: redisConn } = require('../config/config');

const client = redis.createClient({
	host: redisConn.host,
	port: redisConn.port,
	enable_offline_queue: false
});

client.on('error', err => {
	console.log("Error " + err)
});

client.connect().then(() => {
	console.log("Redis connected successfully...");
}).catch((err) => console.log(err));

module.exports = client;