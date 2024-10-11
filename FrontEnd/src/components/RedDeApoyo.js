import React, { useState } from 'react';

// Datos de cuidadores quemados
const caregivers = [
  { id: 1, name: 'Juan Pérez', online: true },
  { id: 2, name: 'María García', online: false },
  { id: 3, name: 'Carlos López', online: true }
];

const RedDeApoyo = () => {
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  // Seleccionar un cuidador para enviarle mensajes
  const handleSelectCaregiver = (caregiver) => {
    setSelectedCaregiver(caregiver);
    setChatMessages([]); // Resetea los mensajes del chat al cambiar de cuidador
  };

  // Enviar un mensaje al cuidador seleccionado
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setChatMessages([...chatMessages, { sender: 'Tú', text: message }]);
      setMessage('');
    }
  };

  return (
    <div className="chat-container" style={styles.chatContainer}>
      <div className="caregiver-list" style={styles.caregiverList}>
        <h4>Cuidadores Disponibles</h4>
        {caregivers.map(caregiver => (
          <div
            key={caregiver.id}
            style={{
              ...styles.caregiverItem,
              backgroundColor: caregiver.online ? '#e0ffe0' : '#ffe0e0',
              cursor: 'pointer'
            }}
            onClick={() => handleSelectCaregiver(caregiver)}
          >
            <span style={caregiver.online ? styles.online : styles.offline}></span>
            {caregiver.name}
          </div>
        ))}
      </div>

      <div className="chat-box" style={styles.chatBox}>
        {selectedCaregiver ? (
          <>
            <h5>Chateando con {selectedCaregiver.name}</h5>
            <div className="chat-messages" style={styles.chatMessages}>
              {chatMessages.map((msg, index) => (
                <div key={index} style={styles.message}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input" style={styles.chatInput}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe un mensaje"
                style={styles.input}
              />
              <button onClick={handleSendMessage} style={styles.sendButton}>Enviar</button>
            </div>
          </>
        ) : (
          <p>Selecciona un cuidador para iniciar una conversación</p>
        )}
      </div>
    </div>
  );
};

// Estilos en línea
const styles = {
  chatContainer: {
    display: 'flex',
    width: '100%',
    height: '400px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  caregiverList: {
    width: '30%',
    borderRight: '1px solid #ccc',
    padding: '10px',
    backgroundColor: '#f7f7f7'
  },
  caregiverItem: {
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center'
  },
  online: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'green',
    marginRight: '10px'
  },
  offline: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'red',
    marginRight: '10px'
  },
  chatBox: {
    width: '70%',
    padding: '10px',
    backgroundColor: '#fff'
  },
  chatMessages: {
    height: '300px',
    overflowY: 'scroll',
    borderBottom: '1px solid #ccc',
    marginBottom: '10px',
    padding: '10px'
  },
  message: {
    marginBottom: '10px',
    padding: '5px',
    borderBottom: '1px solid #eaeaea'
  },
  chatInput: {
    display: 'flex'
  },
  input: {
    width: '80%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  sendButton: {
    width: '20%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    marginLeft: '10px'
  }
};

export default RedDeApoyo;




