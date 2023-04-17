const Users = require('./user.model');
const Orders = require('./order.model');
const orderUsers = require('./orderUsers.model');
const Roles = require('./roles.model');
const Materials = require('./materials.model');
const db = require('../db/database');

const initModels = () => {
  // users - orders
  Users.hasMany(Orders, { foreignKey: 'recycler_id' });
  Orders.belongsTo(Users, { foreignKey: 'recycler_id' });

  // users - orderUsers
  Users.hasMany(orderUsers, { foreignKey: 'collector_id' });
  orderUsers.belongsTo(Users, { foreignKey: 'collector_id' });

  // orders - orderUsers
  Orders.hasMany(orderUsers, { foreignKey: 'order_id' });
  orderUsers.belongsTo(Orders, { foreignKey: 'order_id' });

  // users- roles
  Roles.hasMany(Users, { foreignKey: 'role_id' });
  Users.belongsTo(Roles, { foreignKey: 'role_id' });

  // orders - materials
  Materials.hasOne(Orders, { foreignKey: 'material_id' });
  Orders.belongsTo(Materials, { foreignKey: 'material_id' });
};

module.exports = initModels;
