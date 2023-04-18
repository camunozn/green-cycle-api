const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

/* Loading the environment variables from the config.env file. */
dotenv.config({ path: "./config.env" });

const db = new Sequelize({
  database: process.env.DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
  logging: false,
});

module.exports = db;
