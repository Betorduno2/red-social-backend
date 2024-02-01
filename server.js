const express = require('express');
const bodyParser = require('body-parser');
const database = require('./config/database');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const postRoutes = require('./src/routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
// Configuración básica de CORS
app.use(cors());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
