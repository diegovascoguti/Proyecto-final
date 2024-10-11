import React, { useState } from 'react';
import { Card } from 'react-bootstrap';  // Importar el componente Card de Bootstrap

// Datos de preguntas frecuentes según el nivel de Parkinson
const faqs = {
  bajo: [
    { question: '¿Qué es la enfermedad de Parkinson?', answer: 'El Parkinson es un trastorno neurológico progresivo.' },
    { question: '¿Cuáles son los síntomas iniciales?', answer: 'Los síntomas iniciales incluyen temblores y rigidez muscular.' },
    { question: '¿Cómo se diagnostica el Parkinson?', answer: 'El diagnóstico se basa en exámenes neurológicos y de imagen.' },
    { question: '¿Es el Parkinson hereditario?', answer: 'En la mayoría de los casos, el Parkinson no es hereditario.' },
    { question: '¿Existen terapias alternativas?', answer: 'Algunas personas usan terapias como yoga y acupuntura.' }
  ],
  media: [
    { question: '¿Cómo afecta el Parkinson al equilibrio?', answer: 'El Parkinson puede afectar el equilibrio y causar caídas.' },
    { question: '¿Cuáles son los tratamientos para el Parkinson?', answer: 'Los tratamientos incluyen medicamentos y fisioterapia.' },
    { question: '¿Cómo cambia la calidad de vida con el Parkinson?', answer: 'La calidad de vida puede mejorar con apoyo y ejercicio.' },
    { question: '¿Qué papel juega la dopamina en el Parkinson?', answer: 'El Parkinson está asociado con la pérdida de dopamina en el cerebro.' },
    { question: '¿Cómo afecta el Parkinson al sueño?', answer: 'El Parkinson puede causar insomnio y trastornos del sueño.' }
  ],
  alto: [
    { question: '¿Cuándo se requiere ayuda diaria para el Parkinson?', answer: 'En las etapas avanzadas se requiere ayuda diaria.' },
    { question: '¿Qué cirugías existen para el Parkinson?', answer: 'La estimulación cerebral profunda es una opción en etapas avanzadas.' },
    { question: '¿Cómo afecta el Parkinson a las habilidades motoras finas?', answer: 'El Parkinson puede dificultar tareas como escribir o abotonar una camisa.' },
    { question: '¿Qué se puede esperar en las etapas avanzadas?', answer: 'En las etapas avanzadas, los síntomas motores y no motores empeoran.' },
    { question: '¿Qué tipo de cuidado es necesario en etapas avanzadas?', answer: 'Es posible que se necesite cuidado especializado o un centro de atención.' }
  ]
};

const FAQ = ({ nivel }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Alterna la visibilidad
  };

  // Convertir el nivel a minúsculas y manejar el caso "Moderado"
  const nivelKey = nivel.toLowerCase() === 'moderado' ? 'media' : nivel.toLowerCase();  

  const preguntasFrecuentes = faqs[nivelKey] || [];

  return (
    <div className="container mt-4 mb-4">
      <h4 className="text-center mb-4">Preguntas Frecuentes - Nivel {nivel}</h4>
      {preguntasFrecuentes.length > 0 ? (
        <div className="row">
          {preguntasFrecuentes.map((faq, index) => (
            <div key={index} className="col-md-12 mb-3">
              <Card className="shadow-sm">
                <Card.Header 
                  style={{ cursor: 'pointer', backgroundColor: '#007bff', color: 'white' }} 
                  onClick={() => toggleFAQ(index)}
                >
                  <h6 className="mb-0">{faq.question}</h6>
                </Card.Header>
                <Card.Body 
                  className={`p-3 ${activeIndex === index ? 'show' : 'collapse'}`} 
                  style={{ transition: 'max-height 0.3s ease' }}
                >
                  <p>{faq.answer}</p>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No hay preguntas frecuentes disponibles para este nivel.</p>
      )}
    </div>
  );
};

export default FAQ;



