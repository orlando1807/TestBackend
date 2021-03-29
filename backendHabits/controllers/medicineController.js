
const medicines = require('../models/Medicine');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const moment = require('moment');
/* POST */
exports.createMedicine = (req, res) => {
    let io = req.app.get('socketio');
    
    // Revisamos si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }

    try {
        req.body.id = uuidv4();
        req.body.registerDate = moment(new Date()).format('DD/MM/YYYY');
        medicines.push(req.body);
        io.sockets.emit('Data created', req.body);
        res.json({ msg: "Se creó el medicamento correctamente." });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }

}

/* GET */
exports.getMedicines = (req, res) => {
    try {
        res.json({ medicines: medicines });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

/* GET /:id */
exports.getMedicine = (req, res) => {
    try {
        const resp = medicines.filter(medicine => medicine.id === req.params.id);
        res.json({ medicines: resp });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

/* PUT /:id */
exports.updateMedicine = (req, res) => {
    try {
        medicines.filter((medicine, index) => {
            if (medicine.id === req.params.id) {
                medicines[index].name = req.body.name ? req.body.name : medicines[index].name;
                medicines[index].type = req.body.type ? req.body.type : medicines[index].type;
                medicines[index].quantity = req.body.quantity ? req.body.quantity : medicines[index].quantity;
                medicines[index].price = req.body.price ? req.body.price : medicines[index].price;
                medicines[index].location = req.body.location ? req.body.location : medicines[index].location;
                res.json({ msg: "Se actualizó el medicamento correctamente." });
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

/* DELETE /:id */
exports.deleteMedicine = (req, res) => {
    let io = req.app.get('socketio');
    try {
        medicines.filter((medicine, index) => {
            if (medicine.id === req.params.id) {
                io.sockets.emit('Deleted data', medicines[index]);
                medicines.splice(index, 1);
                res.json({ msg: "Se eliminó el medicamento correctamente." });
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}