// Rutas para crear medicamento
const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crear un medicines
// api/medicine

router.post('/',
    [
        check('name', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('type', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('quantity', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('registerDate', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('price', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('location', 'El nombre de la medicina es obligatorio').not().isEmpty(),
    ],
    medicineController.createMedicine);
router.get('/', medicineController.getMedicines);
router.get('/:id', medicineController.getMedicine);
router.put('/:id',
    [
        check('name', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('type', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('quantity', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('registerDate', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('price', 'El nombre de la medicina es obligatorio').not().isEmpty(),
        check('location', 'El nombre de la medicina es obligatorio').not().isEmpty(),
    ],
    medicineController.updateMedicine);
router.delete('/:id', medicineController.deleteMedicine);

module.exports = router;