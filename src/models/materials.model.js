const { DataTypes } = require('sequelize');
const db = require('../db/database');

const Materials = db.define(
  'materials',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    material_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Materials;
