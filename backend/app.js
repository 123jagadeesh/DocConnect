const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const mappingRoutes = require('./routes/mappings');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);

app.use(errorHandler);

// Test DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    // For development only: sync models (use migrations in production)
    await sequelize.sync({ alter: true });
  } catch (err) {
    console.error('DB connection failed', err);
  }
})();

module.exports = app;
