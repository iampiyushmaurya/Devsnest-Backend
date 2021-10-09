const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("devs_db", "postgres", "boomslang", {
  host: "localhost",
  dialect: "postgres",
});

sequelize.sync();

// IIFE
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established with DB");
  } catch (err) {
    console.error("Unable to connect to DB", err);
  }
})();

module.exports = sequelize;
