const express = require('express');
// Creando servidor
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const medicines = require('./routes/medicines');
let jwt =  require('jsonwebtoken')
// Habilitamos express.json
app.use(express.json({ extended: true }));

// Improtando rutas
// ruta solo para crear el token enviando un get (solo ejemplo para generar token)
app.use('/api/login', (req,res)=>{
  const user = {user:"test", password:"test"};
  const token = jwt.sign({user},'my_secret_key',{expiresIn:"1800s"});
  res.json({
    token:token
  })
});
// rutas para crear medicamentos de la farmacia (post,get,put,delete)
app.use('/api/medicines', medicines);

app.set('socketio',io);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`El servidor se levanto en el puerto ${PORT}`);
});
