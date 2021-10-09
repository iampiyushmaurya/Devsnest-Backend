const express = require("express");
const redis = require("redis");
const { Client } = require("pg");

const app = express();
const PORT = process.env.PORT || 5000;

// Postgres
const pgClient = new Client({
  user: "postgres",
  password: "boomslang",
  host: "localhost",
  database: "devs_db",
  dialect: "postgres",
  port: 5432,
});

pgClient.connect();

pgClient.on("connect", () => {
  console.log("Postgres is successfully connected");
});

pgClient.on("error", () => {
  console.error("Error while connecting to postgres");
});

pgClient.on("end", () => {
  console.log("Postgres connection is stopped");
});

// Redis
const REDIS_PORT = process.env.PORT || 6379;
const redisClient = redis.createClient();

redisClient.on("connect", () => {
  console.log(`Redis is connected at port ${REDIS_PORT}`);
});

redisClient.on("error", () => {
  console.error("Error in Redis");
});

// Cache Middleware
function cache(req, res, next) {
  const id = parseInt(req.params.id);
  redisClient.get(id, (err, data) => {
    if (err) {
      throw err;
    }
    if (data !== null) {
      console.log("Redis cache hit..");
      console.log(data);
      res.send(setResponse(JSON.parse(data)));
    } else {
      next();
    }
  });
}

// Express
//get all users
const getUsers = async (req, res) => {
  await pgClient.query("SELECT * FROM dummy ORDER BY id ASC", (err, data) => {
    if (err) {
      console.error(err);
    }
    res.status(200).json(data.rows);
  });
};

const setResponse = (data) => {
  const id = data.id;
  const name = data.name;
  const age = data.age;
  return `<h2>ID=${id}, Name=${name}, Age=${age} </h2>`;
};

//get user by id --> "/users/:id"
const getUserByID = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log("Fetching from Database...");

    //id=$1`,[id] is written so noone can steal data or manipulate table from search bar of the browser
    const data = await pgClient.query(`SELECT * FROM dummy WHERE id=$1`, [id]);
    redisClient.set(id, JSON.stringify(data.rows[0]));
    if (data.rows !== null) {
      res.send(setResponse(data.rows[0]));
    } else {
      res.send({ msg: "Data not Found" });
    }
  } catch (error) {
    res.send(err);
  }
};

// routes
app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, Redis and Postgres Connection" });
});

app.get("/users", getUsers);
app.get("/users/:id", cache, getUserByID);

// listener
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Listening at port ${PORT}`);
  }
});
