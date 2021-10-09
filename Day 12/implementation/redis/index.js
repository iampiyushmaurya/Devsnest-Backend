const { response } = require("express");
const express = require("express");
const { redisClient, RedisStore, session } = require("./redis");

const app = express();

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "secure123key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 1 * 360000,
    },
  })
);

app.get("/", (req, res) => {
  res.send("Redis is working");
});

app.get("/set", (req, res) => {
  const sess = req.session;
  sess.username = "Neo";
  res.status(200).send(sess.username);
});

app.get("/get", (req, res) => {
  console.log("Redis Value:", req.session.username);
  res.send(req.session.username);
});

app.listen(5000, (err) => {
  if (err) {
    console.error(err);
  }
  console.log("Connection is established on port 5000");
});
