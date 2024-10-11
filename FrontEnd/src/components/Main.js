import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faExclamationTriangle, faCheck, faTasks } from '@fortawesome/free-solid-svg-icons';
import { Tab, Tabs, Modal, Button } from 'react-bootstrap';
import ActivityManager from './ActivityManager';
import InformacionPaciente from './InformacionPaciente';
import RedDeApoyo from './RedDeApoyo';
import FAQ from './FAQ';

const RecommendationModal = ({ show, handleClose, taskList }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Tareas Recomendadas</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {taskList.length > 0 ? (
        <ul>
          {taskList.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      ) : (
        <p>No hay tareas recomendadas para este nivel.</p>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
);

const Main = ({ handleLogout }) => {
  const [surveyData, setSurveyData] = useState({
    name: '',
    age: '',
    level: '',
    answers: []
  });

  const [showModal, setShowModal] = useState(false);
  const [currentTasks, setCurrentTasks] = useState([]);

  const preguntasEnunciados = [
    '¿Ha tenido problemas con el equilibrio en los últimos días?',
    '¿Ha experimentado rigidez en los músculos recientemente?',
    '¿Ha sentido temblores al descansar?',
    '¿Tiene problemas para caminar largas distancias?',
    '¿Tiene dificultades para abrochar botones?',
    '¿Ha experimentado episodios de depresión o ansiedad?',
    '¿Tiene problemas para escribir con claridad?'
  ];

  const recomendaciones = {
    'Leve': ['Hacer ejercicios de equilibrio', 'Realizar caminatas cortas'],
    'Moderado': ['Consultar a un fisioterapeuta', 'Revisar el plan de medicación'],
    'Grave': ['Realizar fisioterapia intensiva', 'Coordinar asistencia diaria']
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token available');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/survey/last', {
          headers: { 'Authorization': token }
        });

        if (response.data) {
          setSurveyData(response.data);
          console.log("Nivel de Parkinson:", response.data.level); 
        } else {
          console.error('No se encontraron datos');
        }
      } catch (error) {
        console.error('Error al recuperar los datos:', error);
      }
    };
    fetchData();
  }, []);

  const mapAnswerToText = (answer) => {
    switch (answer) {
      case '0': return 'No';
      case '1': return 'Leve';
      case '2': return 'Moderado';
      case '3': return 'Grave';
      default: return 'N/A';
    }
  };

  const getIconForAnswer = (answer) => {
    switch (answer) {
      case 'No': return <FontAwesomeIcon icon={faCheck} className="text-primary" />;
      case 'Leve': return <FontAwesomeIcon icon={faArrowDown} className="text-success" />;
      case 'Moderado': return <FontAwesomeIcon icon={faArrowUp} className="text-warning" />;
      case 'Grave': return <FontAwesomeIcon icon={faExclamationTriangle} className="text-danger" />;
      default: return null;
    }
  };

  const handleOpenModal = (level) => {
    const taskList = recomendaciones[level] || [];
    setCurrentTasks(taskList);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-5">
      <div className="text-end mb-3">
        <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
      </div>
      <h1 className="text-center mb-4">App cuidador de paciente</h1>

      {/* Card que muestra el resultado del test */}
      <div className="card mb-5 shadow-sm">
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <div className="p-3">
              <h4 className="card-title">Paciente: {surveyData.name || 'N/A'}</h4>
              <p className="card-text">Edad: {surveyData.age || 'N/A'}</p>
              <p className="card-text">Nivel de Parkinson: {surveyData.level || 'N/A'}</p>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Resultado Test</h5>
              {surveyData.answers.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {surveyData.answers.map((answer, index) => (
                    <li 
                      className="list-group-item d-flex justify-content-between align-items-center" 
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      key={index}
                    >
                      <div style={{ flex: 3, fontWeight: 'bold' }}>
                        {preguntasEnunciados[index]}
                      </div>
                      <div style={{ flex: 1, textAlign: 'right' }}>
                        {mapAnswerToText(answer)}
                      </div>
                      <div style={{ flex: 0.5, marginLeft: '10px', textAlign: 'center' }}>
                        {getIconForAnswer(mapAnswerToText(answer))}
                      </div>
                      <div style={{ flex: 0.5, marginLeft: '10px', textAlign: 'center' }}>
                        <FontAwesomeIcon 
                          icon={faTasks} 
                          className="text-info" 
                          onClick={() => handleOpenModal(mapAnswerToText(answer))} 
                          style={{ cursor: 'pointer' }} 
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay respuestas disponibles</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultActiveKey="gestión" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="gestión" title="Gestión de Tareas">
          <ActivityManager />
        </Tab>
        <Tab eventKey="faq" title="FAQ">
          <FAQ nivel={surveyData.level} />
        </Tab>
        <Tab eventKey="apoyo" title="Red de Apoyo">
          <RedDeApoyo nivel={surveyData.level || 'Baja'} />
        </Tab>
        <Tab eventKey="información" title="Sección de contenido especializado">
          <InformacionPaciente name={surveyData.name} level={surveyData.level} />
        </Tab>
      </Tabs>

      {/* Modal de recomendaciones */}
      <RecommendationModal show={showModal} handleClose={handleCloseModal} taskList={currentTasks} />
    </div>
  );
};

export default Main;

