const mongoose = require('mongoose');

const CaregiverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: false }, // Añadimos el campo para el estado de conexión
});

module.exports = mongoose.model('Caregiver', CaregiverSchema);
