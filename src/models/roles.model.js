const { DataTypes } = require('sequelize');
const db = require('../db/database');

const Roles = db.define(
  'roles',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.ENUM('reciclador', 'recolector'),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Roles;
