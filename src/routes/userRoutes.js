// /src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Obtener todos los usuarios
router.get('/', authenticateToken, userController.getAllUsers);

// Obtener un usuario por ID
router.get('/:id',authenticateToken, userController.getUserById);

// Crear un nuevo usuario
router.post('/', userController.createUser);

// Actualizar un usuario por ID
router.put('/:id',authenticateToken, userController.updateUser);

// Eliminar un usuario por ID
router.delete('/:id',authenticateToken, userController.deleteUser);

module.exports = router;
