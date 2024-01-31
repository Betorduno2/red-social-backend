const express = require('express');
const bodyParser = require('body-parser');
const database = require('./config/database');
const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
