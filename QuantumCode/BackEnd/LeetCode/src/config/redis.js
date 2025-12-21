const { createClient } = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-10141.crce179.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 10141
    }
});


module.exports = redisClient;