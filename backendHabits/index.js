const express = require('express');
// Creando servidor
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const medicines = require('./routes/medicines');
// Habilitamos express.json
app.use(express.json({ extended: true }));

// Improtando rutas
app.use('/api/medicines', medicines);
app.set('socketio',io);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`El servidor se levanto en el puerto ${PORT}`);
});
