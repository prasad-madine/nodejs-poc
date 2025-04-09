const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Naruto@316219", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
