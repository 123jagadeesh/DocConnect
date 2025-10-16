const { Mapping, Patient, Doctor } = require('../models');

exports.assignDoctorToPatient = async (req, res, next) => {
  try {
    const { patientId, doctorId } = req.body;
    const patient = await Patient.findByPk(patientId);
    const doctor = await Doctor.findByPk(doctorId);
    if (!patient || !doctor) return res.status(404).json({ error: 'Patient or Doctor not found' });

    // Optional: check createdBy permission or other business rules
    const mapping = await Mapping.create({ patientId, doctorId });
    res.status(201).json(mapping);
  } catch (err) {
    next(err);
  }
};

exports.getAllMappings = async (req, res, next) => {
  try {
    const maps = await Mapping.findAll({ include: ['Patient', 'Doctor'] });
    res.json(maps);
  } catch (err) {
    next(err);
  }
};

exports.getDoctorsForPatient = async (req, res, next) => {
  try {
    const patientId = req.params.patientId;
    const mappings = await Mapping.findAll({ where: { patientId }, include: [{ model: Doctor, as: 'Doctor' }] });
    res.json(mappings.map(m => m.Doctor));
  } catch (err) {
    next(err);
  }
};

exports.removeMapping = async (req, res, next) => {
  try {
    const mapping = await Mapping.findByPk(req.params.id);
    if (!mapping) return res.status(404).json({ error: 'Mapping not found' });
    await mapping.destroy();
    res.json({ message: 'Mapping deleted' });
  } catch (err) {
    next(err);
  }
};
