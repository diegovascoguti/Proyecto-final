import React, { useState } from 'react';
import { Accordion, Modal, Button } from 'react-bootstrap';

// Contenido para cada nivel
const contenidos = {
  baja: {
    videos: [
      { title: 'Video sobre ejercicios para Parkinson - Nivel Bajo', url: 'https://www.youtube.com/embed/1t6C_uoi3f4' },
      { title: 'Terapia ocupacional para pacientes - Nivel Bajo', url: 'https://www.youtube.com/embed/gynZw_z9d6U' }
    ],
    articulos: [
      { title: 'Estudio sobre el efecto de los ejercicios en pacientes con Parkinson - Nivel Bajo', description: 'Este estudio muestra cómo los ejercicios físicos ayudan a retrasar los síntomas del Parkinson.', url: 'https://ejemplo.com/articulo1' },
      { title: 'Investigación sobre nuevas terapias para el tratamiento del Parkinson - Nivel Bajo', description: 'Un análisis de las nuevas técnicas en el tratamiento de la enfermedad.', url: 'https://ejemplo.com/articulo2' }
    ],
    blogs: [
      { title: 'Blog: Vivir con Parkinson - Mi experiencia personal - Nivel Bajo', description: 'Una paciente comparte su experiencia diaria en el manejo de la enfermedad.', url: 'https://ejemplo.com/blog1' },
      { title: 'Blog: Consejos para cuidadores de pacientes con Parkinson - Nivel Bajo', description: 'Consejos prácticos para cuidadores sobre cómo mejorar la calidad de vida del paciente.', url: 'https://ejemplo.com/blog2' }
    ]
  },
  media: {
    videos: [
      { title: 'Video sobre ejercicios avanzados para Parkinson - Nivel Medio', url: 'https://www.youtube.com/embed/gynZw_z9d6U' },
      { title: 'Terapias avanzadas para el Parkinson - Nivel Medio', url: 'https://www.youtube.com/embed/1t6C_uoi3f4' }
    ],
    articulos: [
      { title: 'Estudio sobre ejercicios avanzados en pacientes con Parkinson - Nivel Medio', description: 'Estudio que muestra cómo los ejercicios avanzados benefician a los pacientes con Parkinson.', url: 'https://academica-e.unavarra.es/server/api/core/bitstreams/100b0b8d-078e-4c4f-8d60-5dbdf6a5f2fd/content' },
      { title: 'Nuevas investigaciones sobre el tratamiento del Parkinson - Nivel Medio', description: 'Un análisis de nuevas técnicas de tratamiento.', url: 'https://conoceelparkinson.org/investigacion/parkinson-2022-investigacion/' }
    ],
    blogs: [
      { title: 'Blog: Cómo enfrentar el Parkinson en sus etapas medias - Nivel Medio', description: 'Consejos y experiencias sobre cómo manejar el Parkinson en sus etapas intermedias.', url: 'https://ejemplo.com/blog3' },
      { title: 'Blog: El papel de los cuidadores en las etapas medias del Parkinson - Nivel Medio', description: 'Cómo los cuidadores pueden apoyar mejor a los pacientes en esta etapa.', url: 'https://ejemplo.com/blog4' }
    ]
  },
  alta: {
    videos: [
      { title: 'Ejercicios intensivos para Parkinson - Nivel Alto', url: 'https://www.youtube.com/embed/gynZw_z9d6U' },
      { title: 'Terapias especializadas para pacientes avanzados - Nivel Alto', url: 'https://www.youtube.com/embed/1t6C_uoi3f4' }
    ],
    articulos: [
      { title: 'Efectos de los ejercicios intensivos en pacientes con Parkinson - Nivel Alto', description: 'Cómo los ejercicios intensivos pueden ayudar en las fases avanzadas del Parkinson.', url: 'https://ejemplo.com/articulo5' },
      { title: 'Nuevas terapias para el Parkinson en fase avanzada - Nivel Alto', description: 'Terapias innovadoras para pacientes en etapas avanzadas.', url: 'https://ejemplo.com/articulo6' }
    ],
    blogs: [
      { title: 'Blog: Mi vida con Parkinson avanzado - Nivel Alto', description: 'Relatos personales de la vida con Parkinson avanzado.', url: 'https://ejemplo.com/blog5' },
      { title: 'Blog: Apoyo a cuidadores de pacientes con Parkinson avanzado - Nivel Alto', description: 'Cómo los cuidadores pueden manejar mejor los desafíos de esta etapa.', url: 'https://ejemplo.com/blog6' }
    ]
  }
};

// Mapeo de niveles
const nivelMapeo = {
  'Bajo': 'baja',
  'Moderado': 'media',
  'Alto': 'alta'
};

const InformacionPaciente = ({ name, level }) => {
  const nivel = nivelMapeo[level] || 'baja';  // Mapeo del nivel
  const contenido = contenidos[nivel] || contenidos.baja;  // Usar contenido de nivel bajo por defecto si no se encuentra

  // Estado para controlar el modal
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '', url: '' });

  // Función para abrir el modal con el contenido seleccionado
  const handleShowModal = (title, description, url) => {
    setModalContent({ title, description, url });
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contenido especializado para {name || 'Paciente no registrado'} - Nivel {level}</h2>
      
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Videos</Accordion.Header>
          <Accordion.Body>
            <div className="row">
              {contenido.videos.map((video, index) => (
                <div className="col-md-6 mb-3" key={index}>
                  <iframe
                    width="100%"
                    height="315"
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p className="text-center">{video.title}</p>
                </div>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Artículos Científicos</Accordion.Header>
          <Accordion.Body>
            <ul className="list-group">
              {contenido.articulos.map((articulo, index) => (
                <li className="list-group-item" key={index}>
                  <h5>{articulo.title}</h5>
                  <p>{articulo.description}</p>
                  <Button variant="primary" onClick={() => handleShowModal(articulo.title, articulo.description, articulo.url)}>
                    Leer más
                  </Button>
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Blogs</Accordion.Header>
          <Accordion.Body>
            <ul className="list-group">
              {contenido.blogs.map((blog, index) => (
                <li className="list-group-item" key={index}>
                  <h5>{blog.title}</h5>
                  <p>{blog.description}</p>
                  <Button variant="primary" onClick={() => handleShowModal(blog.title, blog.description, blog.url)}>
                    Leer más
                  </Button>
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Modal para mostrar detalles del artículo o blog */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalContent.description}</p>
          <a href={modalContent.url} target="_blank" rel="noopener noreferrer">
            Ir al enlace original
          </a>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InformacionPaciente;




