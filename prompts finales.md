# Untitled

# Prompts para el Proyecto de Cuidadores de Pacientes con Parkinson

## 1. **Prompt para inicio del proyecto con instrucciones claras**:

*"Estoy desarrollando una aplicación para cuidadores de pacientes con Parkinson. Quiero que los usuarios puedan registrarse, iniciar sesión y, al hacerlo por primera vez, que deban completar una encuesta. ¿Podrías ayudarme a estructurar las rutas de autenticación y la lógica del flujo de usuarios en Node.js y React?"*

---

## 2. **Prompt para manejar flujo condicional de usuarios**:

*"Quiero que los usuarios que ya han hecho la encuesta no la repitan. Si se registran e inician sesión por primera vez, deben hacer la encuesta. Si ya la hicieron, deben ir al menú principal. ¿Cómo puedo implementar esta lógica tanto en el backend como en el frontend?"*

---

## 3. **Prompt para manejo de estados y componentes en React**:

*"En mi componente de React necesito mostrar una lista de actividades diarias que un cuidador puede agregar. ¿Podrías ayudarme a crear un componente para agregar y listar estas actividades? Además, quiero que las actividades puedan marcarse como cumplidas."*

---

## 4. **Prompt para mejorar la interfaz con un selector de estado**:

*"Me gustaría agregar un selector 'Sí/No' en la tabla de actividades que permita cambiar el estado de la actividad. Quiero que si está en 'Sí', la actividad pueda eliminarse, y si está en 'No', que aparezca una alerta que impida su eliminación. ¿Cómo puedo implementar esto en mi componente?"*

---

## 5. **Prompt para integrar con MongoDB y JWT**:

*"Estoy utilizando MongoDB para almacenar la información de las encuestas y JWT para manejar la autenticación. ¿Cómo puedo asegurarme de que al iniciar sesión se extraiga correctamente el ID del paciente desde el JWT para luego asociar las actividades con el paciente correspondiente?"*

---

## 6. **Prompt para generar un flujo de autenticación completo**:

*"Quiero que al registrarse o iniciar sesión, los usuarios reciban un token JWT. Este token debe contener el ID del paciente para utilizarlo luego en la aplicación. ¿Podrías ayudarme a estructurar el flujo de generación y validación de tokens en el backend y su uso en el frontend?"*

---

## 7. **Prompt para mejorar el diseño del formulario en React**:

*"Me gustaría hacer que mi formulario sea más atractivo visualmente. Actualmente tengo un formulario básico de tipo texto para agregar actividades. ¿Podrías ayudarme a aplicar Bootstrap o alguna otra librería que haga que la interfaz sea más intuitiva y visualmente agradable?"*

---

## 8. **Prompt para manejar componentes colapsables**:

*"En mi aplicación tengo un componente acordeón para gestionar las secciones de 'Gestión de Tareas', 'Red de Apoyo' e 'Información del Paciente'. Sin embargo, quiero cambiarlo por tabs para que sea más intuitivo y los usuarios puedan navegar entre secciones sin desplegar acordeones. ¿Podrías guiarme en cómo hacer esta transición?"*

---

## 9. **Prompt para integración del frontend con el backend**:

*"He desarrollado un frontend con React y un backend en Node.js con Express. Necesito integrar ambas partes de manera fluida para manejar actividades y encuestas de los pacientes. ¿Cuál es la mejor manera de estructurar las llamadas a la API y manejar los tokens de autenticación en esta arquitectura?"*

---

## 10. **Prompt para mejorar la estructura de datos**:

*"Actualmente estoy manejando las actividades en un estado local dentro de React, pero me gustaría migrarlas a un almacenamiento en MongoDB para que las actividades estén asociadas a un paciente específico. ¿Podrías guiarme en cómo estructurar el modelo de datos en Mongoose y hacer que las actividades se guarden y recuperen correctamente?"*

---

## Nuevos Prompts para Cierre del Proyecto:

### 11. **Prompt para cerrar el proyecto con pruebas y optimización**:

*"Estoy cerrando mi aplicación de cuidadores y me gustaría integrar pruebas unitarias, de integración y pruebas E2E para asegurar que todas las funcionalidades estén correctamente implementadas. ¿Cómo puedo estructurar estas pruebas utilizando Jest y Cypress? ¿Podrías guiarme en cómo optimizar la carga de datos para mejorar el rendimiento general?"*

---

### 12. **Prompt para mejorar la experiencia de usuario con animaciones y respuestas visuales**:

*"Quiero mejorar la experiencia de usuario añadiendo animaciones y respuestas visuales a las interacciones con los formularios y tablas. ¿Cómo puedo usar CSS, Bootstrap, o librerías como Framer Motion para hacer que las transiciones sean más fluidas y atractivas?"*

---

### 13. **Prompt para manejar seguridad y validación de datos**:

*"Dado que mi aplicación gestiona información sensible de pacientes, quiero reforzar la seguridad y validación de datos tanto en el backend como en el frontend. ¿Cómo puedo implementar medidas adicionales como la validación de formularios, sanitización de datos y protección CSRF en Node.js y React?"*

---

### 14. **Prompt para asegurar rendimiento en producción y escalabilidad**:

*"Mi aplicación será utilizada por múltiples cuidadores y pacientes. Quiero asegurar que el rendimiento sea óptimo y que la aplicación escale correctamente. ¿Podrías ayudarme a optimizar el rendimiento en producción y asegurar la escalabilidad utilizando técnicas como lazy loading, code splitting, y optimización del backend con Node.js?"*

---

### 15. **Prompt para crear un plan de pruebas de rendimiento y carga**:

*"Quiero evaluar cómo mi aplicación responde bajo alta demanda. ¿Podrías ayudarme a definir un plan de pruebas de rendimiento y carga utilizando herramientas como Apache JMeter o Artillery para simular múltiples usuarios y medir el tiempo de respuesta de mis API y el rendimiento general?"*

---

### 16. **Prompt para mejorar la accesibilidad de la aplicación**:

*"Mi aplicación es utilizada por cuidadores de pacientes que pueden tener dificultades visuales o auditivas. Quiero mejorar la accesibilidad para asegurar que la aplicación sea fácil de usar para todos. ¿Cómo puedo implementar prácticas de accesibilidad, como navegación por teclado y compatibilidad con lectores de pantalla?"*