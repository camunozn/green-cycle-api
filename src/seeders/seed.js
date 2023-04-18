const db = require('../db/database');
const initModels = require('../models/initModels');
const Users = require('../models/user.model');
const Orders = require('../models/order.model');
const OrderUsers = require('../models/orderUsers.model');
const Materials = require('../models/materials.model');
const Roles = require('../models/roles.model');

initModels();

const roles = [{ role_name: 'reciclador' }, { role_name: 'recolector' }];

const materials = [
  { material_name: 'vidrio' },
  { material_name: 'plástico' },
  { material_name: 'papel/cartón' },
  { material_name: 'tetrapack' },
  { material_name: 'latas' },
];

const users = [
  {
    firstname: 'Ian',
    lastname: 'Pérez',
    email: 'ian@example.com',
    password: '12345',
    role_id: 1,
  },
  {
    firstname: 'Harvey',
    lastname: 'López',
    email: 'harvey@example.com',
    password: '12345',
    role_id: 1,
  },
  {
    firstname: 'Noe',
    lastname: 'Vargas',
    email: 'noe@example.com',
    password: '12345',
    role_id: 1,
  },
  {
    firstname: 'Roberto',
    lastname: 'Ponce',
    email: 'roberto@example.com',
    password: '12345',
    role_id: 2,
  },
  {
    firstname: 'Diana',
    lastname: 'Hernández',
    email: 'diana@example.com',
    password: '12345',
    role_id: 2,
  },
];

const orders = [
  {
    volumen: 'pequeño',
    weight: '4',
    observations: 'Recolectar solo fin de semana',
    material_id: 5,
    recycler_id: 1,
  },
  {
    volumen: 'mediano',
    weight: '8',
    observations: 'Preguntar con el guardia',
    material_id: 3,
    recycler_id: 2,
  },
  {
    volumen: 'grande',
    weight: '12',
    observations: 'Está pesadito',
    material_id: 1,
    recycler_id: 1,
  },
  {
    volumen: 'pequeño',
    weight: '2',
    observations: 'Solo unas botellitas',
    material_id: 1,
    recycler_id: 3,
    status: 'asignado',
  },
  {
    volumen: 'mediano',
    weight: '9',
    observations: 'Recolectar antes de las 8am',
    material_id: 2,
    recycler_id: 3,
    status: 'entregado',
  },
  {
    volumen: 'grande',
    weight: '14',
    observations: 'Recolectar solo martes o jueves',
    material_id: 4,
    recycler_id: 2,
    status: 'asignado',
  },
  {
    volumen: 'pequeño',
    weight: '1',
    observations: 'Un poco de plástico',
    material_id: 2,
    recycler_id: 1,
    status: 'entregado',
  },
  {
    volumen: 'mediano',
    weight: '7',
    observations: 'Solo cartón',
    material_id: 3,
    recycler_id: 2,
    status: 'entregado',
  },
];

const assignedOrders = [
  { order_id: 4, collector_id: 4 },
  { order_id: 5, collector_id: 4 },
  { order_id: 6, collector_id: 5 },
  { order_id: 7, collector_id: 5 },
  { order_id: 8, collector_id: 5 },
];

db.sync({ force: true }).then(async () => {
  const roleResult = await Roles.bulkCreate(roles);
  if (roleResult) console.log('Roles creados correctamente');
  const matResult = await Materials.bulkCreate(materials);
  if (matResult) console.log('Materiales creados correctamente');
  users.forEach(user => {
    Users.create(user);
  });
  setTimeout(async () => {
    const ordersResult = await Orders.bulkCreate(orders);
    if (ordersResult) console.log('Órdenes creadas correctamente');
    setTimeout(async () => {
      const assignedResult = await OrderUsers.bulkCreate(assignedOrders);
      if (assignedResult) console.log('Órdenes asignadas correctamente');
    }, 400);
  }, 400);
});
