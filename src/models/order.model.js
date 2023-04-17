const { DataTypes } = require('sequelize');
const db = require('../db/database');

const Orders = db.define(
  'orders',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    volumen: {
      type: DataTypes.ENUM('pequeño', 'mediano', 'grande'),
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    image_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    observations: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM('pendiente', 'asignado', 'entregado'),
      allowNull: false,
      defaultValue: 'pendiente',
    },
    material_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recycler_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Orders;
