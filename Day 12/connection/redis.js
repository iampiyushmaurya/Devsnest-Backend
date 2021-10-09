const redis = require("redis");

const REDIS_PORT = process.env.PORT || 6379;

const redisClient = redis.createClient();

redisClient.on("connect", () => {
  console.log("Redis is connected at port", REDIS_PORT);
});

redisClient.on("error", () => {
  console.error("Error in Redis");
});

redisClient.setex("name", 5, "neo", redis.print);
redisClient.get("name", redis.print);
