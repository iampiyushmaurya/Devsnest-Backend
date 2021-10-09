const redis = require("redis");
const connectRedis = require("connect-redis");
const session = require("express-session");

const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

redisClient.on("connect", () => {
  console.log("Connected to redis");
});
redisClient.on("error", (err) => {
  console.error("Error in connection", err);
});

module.exports = { redisClient, RedisStore, session };
