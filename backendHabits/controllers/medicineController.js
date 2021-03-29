
const medicines = require('../models/Medicine');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

/* POST */
exports.createMedicine = (req, res) => {

    // Revisamos si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }

    try {
        req.body.id=uuidv4();
        medicines.push(req.body);
        res.send(medicines);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }

}

/* GET */
exports.getMedicines = (req,res)=>{
    try {
        const resp = medicines;
        res.json({medicines:resp});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

/* GET /:id */
exports.getMedicine = (req,res)=>{
    try {
        const resp = medicines.filter(medicine=> medicine.id===req.params.id);
        console.log(resp);
        res.json({medicines:resp});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

/* PUT /:id */
exports.updateMedicine = (req,res)=>{
    try {
        medicines.filter((medicine,index)=> {
            if(medicine.id===req.params.id){
                medicines[index].name = req.body.name?req.body.name:medicines[index].name;
                medicines[index].type = req.body.type?req.body.type:medicines[index].type;
                medicines[index].quantity = req.body.quantity?req.body.quantity:medicines[index].quantity;
                medicines[index].registerDate = req.body.registerDate?req.body.registerDate:medicines[index].registerDate;
                medicines[index].price = req.body.price?req.body.price:medicines[index].price;
                medicines[index].location = req.body.location?req.body.location:medicines[index].location;
                res.json({medicine:medicines[index]});
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

/* DELETE /:id */
exports.deleteMedicine = (req,res)=>{
    try {
        medicines.filter((medicine,index)=> {
            if(medicine.id===req.params.id){
                medicines.splice(index,1);
                res.json({medicine:medicines});
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}