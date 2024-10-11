const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  answers: {
    type: [String],  // Asegúrate de que sea un array de strings
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Survey', SurveySchema);
