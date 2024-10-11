const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Asegúrate de que el modelo de usuario esté correctamente referenciado

// Obtener todos los cuidadores
router.get('/caregivers', async (req, res) => {
  try {
    const caregivers = await User.find({}, 'name online');  // Busca solo los campos 'name' y 'online'
    res.json(caregivers);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Actualizar estado del cuidador (online/offline)
router.post('/caregivers/updateStatus', async (req, res) => {
  const { userId, online } = req.body;  // Espera recibir el ID del usuario y el estado (online)
  try {
    await User.findByIdAndUpdate(userId, { online });  // Actualiza el estado de 'online'
    res.send('Estado actualizado');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
