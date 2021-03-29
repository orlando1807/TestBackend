const express = require('express');

// Creando servidor
const app = express();

// Habilitamos express.json
app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 3000;

// Improtando rutas
app.use('/api/medicines', require('./routes/medicines'));

app.listen(PORT, () => {
    console.log(`El servidor se levanto en el puerto ${PORT}`);
});