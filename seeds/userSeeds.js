
const { User } = require('../models');

const data = [{
    username: "BigTech42",
    email: "test@mail.com",
    password: "password123"
  },
  {
    username: "BeefWellington12",
    email: "test2@mail.com",
    password: "password123"
  },
  {
    username: "xX_GLORB_Xx",
    email: "test3@mail.com",
    password: "password123"
  }
];

const userSeeds = () => User.bulkCreate(data, {individualHooks: true});

module.exports = userSeeds;



