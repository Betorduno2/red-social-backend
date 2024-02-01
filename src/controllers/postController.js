// /src/controllers/postController.js
const Post = require('../models/Post');

// Obtener todas las publicaciones
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una publicación por ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Publicación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva publicación
exports.createPost = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar una publicación por ID
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      post.title = req.body.title || post.title;
      post.content = req.body.content || post.content;

      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Publicación no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una publicación por ID
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      await post.remove();
      res.json({ message: 'Publicación eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Publicación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
