const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    // accedemos al token desde el header authorization
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(403); // si no encuentra ningun token
    jwt.verify(token, 'my_secret_key', (err, user) => {
      if (err){
        return res.sendStatus(403);
        } 
      req.user = user;
      next(); // pasamos a la siguiente ejecución
    });
  };