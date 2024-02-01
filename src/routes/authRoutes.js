const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Ruta para el inicio de sesión (login)
router.post('/login', authController.login);

module.exports = router;