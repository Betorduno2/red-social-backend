// /src/routes/postRoutes.js
const express = require('express');
const postController = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Obtener todas las publicaciones
router.get('/',authenticateToken, postController.getAllPosts);

// Obtener una publicación por ID
router.get('/:id',authenticateToken, postController.getPostById);

// Crear una nueva publicación
router.post('/',authenticateToken, postController.createPost);

// Actualizar una publicación por ID
router.put('/:id',authenticateToken, postController.updatePost);

// Eliminar una publicación por ID
router.delete('/:id',authenticateToken, postController.deletePost);

module.exports = router;
