const sequelize = require('../config/db');
const User = require('./user');
const Patient = require('./patient');
const Doctor = require('./doctor');
const Mapping = require('./mapping');

const models = { User, Patient, Doctor, Mapping };

// initialize associations
User.initModel(sequelize);
Patient.initModel(sequelize);
Doctor.initModel(sequelize);
Mapping.initModel(sequelize);

// Associations
User.associate(models);
Patient.associate(models);
Doctor.associate(models);
Mapping.associate(models);

module.exports = { sequelize, ...models };
