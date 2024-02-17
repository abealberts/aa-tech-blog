const { sequelize } = require('../config/connection');
const postSeeds = require('./postSeeds');
const userSeeds = require('./userSeeds');
const commentSeeds = require('./commentSeeds');

const seed = async () => {
  await sequelize.sync({ force: false });
  await userSeeds();
  await postSeeds();
  await commentSeeds();
};

module.exports = seed;