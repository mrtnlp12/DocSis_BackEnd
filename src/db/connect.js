const { Sequelize } = require("sequelize");

let sequelize = new Sequelize({
  dialect: "mysql",
  password: "mrtnlp12",
  username: "root",
  host: "localhost",
  database: "DocsisDB",
});

module.exports = sequelize;
