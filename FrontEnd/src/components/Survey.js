import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Survey = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [answers, setAnswers] = useState(Array(7).fill(''));
  const [parkinsonLevel, setParkinsonLevel] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Lista de preguntas
  const questions = [
    'Temblores en reposo',
    'Dificultades para caminar',
    'Rigidez muscular',
    'Movimientos lentos (bradicinesia)',
    'Desequilibrio frecuente',
    'Dificultades para escribir o dibujar',
    'Dificultades para hablar o entender a los demás'
  ];

  // Función para manejar el cambio de respuestas
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Calcular nivel de Parkinson
  const calculateParkinsonLevel = () => {
    const total = answers.reduce((acc, answer) => acc + parseInt(answer), 0);
    if (total <= 7) return 'Bajo';
    if (total <= 14) return 'Moderado';
    return 'Alto';
  };

  // Enviar la encuesta
  const handleSubmit = async (e) => {
    e.preventDefault();
    const level = calculateParkinsonLevel();
    setParkinsonLevel(level);
    setShowModal(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/survey', {
        name,
        age,
        answers,
        level
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Redirigir a la pantalla principal
      navigate('/main');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  // Cerrar el modal y redirigir
  const closeAndRedirect = () => {
    setShowModal(false);
    navigate('/main');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Test de Parkinson</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre del Paciente</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Edad del Paciente</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        {/* Preguntas */}
        {questions.map((question, index) => (
          <div key={index} className="mb-3">
            <label>{question}</label>
            <select
              className="form-select"
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="0">No</option>
              <option value="1">Leve</option>
              <option value="2">Moderado</option>
              <option value="3">Grave</option>
            </select>
          </div>
        ))}

        <button type="submit" className="btn btn-primary w-100">Enviar Respuestas</button>
      </form>

      {/* Modal de resultado */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Resultado de la Encuesta</h5>
              <button type="button" className="btn-close" onClick={closeAndRedirect}></button>
            </div>
            <div className="modal-body">
              <p><strong>Nombre:</strong> {name}</p>
              <p><strong>Edad:</strong> {age}</p>
              <p><strong>Nivel de Parkinson:</strong> {parkinsonLevel}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={closeAndRedirect}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;

