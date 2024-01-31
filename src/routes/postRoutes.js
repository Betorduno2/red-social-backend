// postRoutes.js
const express = require('express');
const router = express.Router();

router.get('/post', (req, res) => {
  res.send('Hello from postRoutes');
});

module.exports = router;
