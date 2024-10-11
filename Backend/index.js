const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken'); // Para manejar la autenticación JWT
const caregiversRoute = require('./routes/caregivers');  // Asegúrate de que el path sea correcto


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/auth');
const surveyRoutes = require('./routes/survey');
const activityRoutes = require('./routes/activity');

app.use('/api/auth', authRoutes);
app.use('/api/survey', surveyRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api', caregiversRoute);  // Todas las rutas dentro de caregivers.js estarán disponibles bajo /api/caregivers


// Modelo de cuidador
const Caregiver = require('./models/Caregiver');

// Manejo de conexiones Socket.IO
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Autenticación del usuario con JWT
  socket.on('authenticate', async (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const caregiver = await Caregiver.findById(decoded.id);
      
      if (caregiver) {
        caregiver.active = true;
        await caregiver.save();

        // Notificar a todos los usuarios conectados sobre el nuevo cuidador activo
        io.emit('caregiverActive', caregiver);

        // Manejar los mensajes de chat
        socket.on('chatMessage', (message) => {
          io.emit('chatMessage', { user: caregiver.name, message });
        });

        // Manejar la desconexión
        socket.on('disconnect', async () => {
          caregiver.active = false;
          await caregiver.save();
          io.emit('caregiverInactive', caregiver);
          console.log('Un usuario se ha desconectado');
        });
      }
    } catch (err) {
      console.error('Error de autenticación:', err.message);
    }
  });
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));


