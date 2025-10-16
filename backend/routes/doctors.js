const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const doctorController = require('../controllers/doctorController');

router.post('/', auth, doctorController.createDoctor);
router.get('/', auth, doctorController.getDoctors);
router.get('/:id', auth, doctorController.getDoctor);
router.put('/:id', auth, doctorController.updateDoctor);
router.delete('/:id', auth, doctorController.deleteDoctor);

module.exports = router;
