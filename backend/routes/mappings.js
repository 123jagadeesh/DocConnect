const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const mappingController = require('../controllers/mappingController');

router.post('/', auth, mappingController.assignDoctorToPatient);
router.get('/', auth, mappingController.getAllMappings);
router.get('/:patientId', auth, mappingController.getDoctorsForPatient);
router.delete('/:id', auth, mappingController.removeMapping);

module.exports = router;
