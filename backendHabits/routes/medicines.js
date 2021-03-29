// Rutas para crear medicamento
const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Crear un medicines
// api/medicine

router.post('/',
    [
        check('name', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('type', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('quantity', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('price', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('location', 'El nombre de la medicina es obligatorio').not().isEmpty(),
    ],
    auth.authenticateToken,
    medicineController.createMedicine);
router.get('/',auth.authenticateToken, medicineController.getMedicines);
router.get('/:id',auth.authenticateToken, medicineController.getMedicine);
router.put('/:id',
    [
        check('name', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('type', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('quantity', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('price', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('location', 'El nombre de la medicina es obligatorio').not().isEmpty(),
    ],
    auth.authenticateToken,
    medicineController.updateMedicine);
router.delete('/:id',auth.authenticateToken, medicineController.deleteMedicine);

module.exports = router;