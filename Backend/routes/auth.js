const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

//Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Busca al usuario por nombre de usuario
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

  // Verifica la contraseña
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

  // Crea un token JWT con el `patientId` del usuario
  const token = jwt.sign({ patientId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Envía el token de vuelta al frontend
  res.status(200).json({ token });
});



router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Incluir hasCompletedSurvey en la respuesta
    res.status(200).json({ 
      token, 
      hasCompletedSurvey: user.hasCompletedSurvey  // Devuelve el estado de la encuesta
    });
  } catch (error) {
    res.status(500).send('Error en el servidor');
  }
});


// Ruta de registro
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send('Usuario registrado exitosamente');
  } catch (error) {
    res.status(400).send('Error al registrar');
  }
});


module.exports = router;
