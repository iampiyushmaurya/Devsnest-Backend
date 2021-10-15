var express = require("express");
var router = express.Router();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "boomslang",
  port: 5432,
});

const getUsers = (req, res) => {
  pool.query(
    'SELECT * FROM "Users" where id=$1 and email=$2',
    [req.query.id, req.query.email],
    (err, result) => {
      if (err) throw err;
      res.status(200).json(result.rows);
    }
  );
};
/* GET users listing. */
router.get("/", getUsers);

module.exports = router;
