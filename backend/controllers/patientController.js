const { Patient, Doctor } = require('../models');

exports.createPatient = async (req, res, next) => {
  try {
    const data = req.body;
    data.createdBy = req.user.id;
    const patient = await Patient.create(data);
    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
};

exports.getPatientsForUser = async (req, res, next) => {
  try {
    const patients = await Patient.findAll({ where: { createdBy: req.user.id }, include: [{ model: Doctor, as: 'doctors' }] });
    res.json(patients);
  } catch (err) {
    next(err);
  }
};

exports.getPatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByPk(req.params.id, { include: [{ model: Doctor, as: 'doctors' }] });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    next(err);
  }
};

exports.updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    if (patient.createdBy !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
    await patient.update(req.body);
    res.json(patient);
  } catch (err) {
    next(err);
  }
};

exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    if (patient.createdBy !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
    await patient.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
