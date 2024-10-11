const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');  // Asegúrate de limpiar el token correctamente
  if (!token) return res.status(401).send('Acceso denegado');
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Token inválido');
  }
}

module.exports = auth;
