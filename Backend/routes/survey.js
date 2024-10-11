const express = require('express');
const Survey = require('../models/Survey');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Ruta POST para guardar la encuesta
router.post('/', async (req, res) => {
  const { name, age, answers, level } = req.body;

  // Verifica si los datos están llegando correctamente al backend
  console.log('Datos recibidos:', req.body);

  // Valida los campos
  if (!name || !age || !answers || !level) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  try {
    // Crea una nueva encuesta
    const newSurvey = new Survey({ name, age, answers, level });
    await newSurvey.save();
    res.status(201).json({ message: 'Encuesta guardada exitosamente' });
  } catch (error) {
    console.error('Error al guardar la encuesta:', error);
    res.status(500).json({ message: 'Error al guardar la encuesta' });
  }
});

// Ruta GET para obtener la última encuesta del usuario autenticado
router.get('/last', auth, async (req, res) => {
  try {
    const lastSurvey = await Survey.findOne({ user: req.user.id }).sort({ _id: -1 });  // Asegurarse de que el usuario autenticado obtenga su propia encuesta
    res.json(lastSurvey);
  } catch (error) {
    res.status(500).send('Error al recuperar la encuesta');
  }
});

module.exports = router;
