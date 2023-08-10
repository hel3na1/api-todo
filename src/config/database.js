const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://ijjifanx:NsLapYv2jN3GRlaX6-hCFguLKDvU8fJN@silly.db.elephantsql.com/ijjifanx', {
  dialect: 'postgres',
});

module.exports = sequelize;