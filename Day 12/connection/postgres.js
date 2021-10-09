const { Client } = require("pg");

const pgClient = new Client({
  user: "postgres",
  password: "boomslang",
  host: "localhost",
  database: "devs_db",
  dialect: "postgres",
  port: "5432",
});

pgClient.connect();

pgClient.on("connect", () => {
  console.log("Postgres successfully connected");
});

pgClient.on("end", () => {
  console.log("Postgres connection is stopped");
});

pgClient.query("SELECT * FROM dummy;", [], (err, res) => {
  if (err) {
    pgClient.end();
  }
  console.log("Response:", res.rows);
});
