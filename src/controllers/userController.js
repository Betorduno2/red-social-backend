// /src/controllers/userController.js
const User = require('../models/User');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const user = new User({
    fullName: req.body.fullName,
    alias: req.body.alias,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    // Intentar guardar el usuario
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    // Manejar errores al guardar el usuario
    if (error.code === 11000) {
      // Si el error es por índice único
      const duplicateField = Object.keys(error.keyPattern)[0];
  
      let errorMessage = '';
      if (duplicateField === 'email') {
        errorMessage = 'El correo electrónico ya está en uso.';
      } else if (duplicateField === 'alias') {
        errorMessage = 'El alias ya está en uso.';
      } else {
        errorMessage = error.message;
      }
  
      res.status(400).json({ message: errorMessage });
    } else {
      // Otros errores
      res.status(400).json({ message: error.message });
    }
  }
  
};


// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.fullName = req.body.fullName || user.fullName;
      user.alias = req.body.alias || user.alias;
      user.age = req.body.age || user.age;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;

      try {
        // Actualizar el usuario
        const updatedUser = await user.save();
      res.json(updatedUser);
      } catch (error) {
        // Manejar errores al guardar el usuario
        if (error.code === 11000) {
          // Si el error es por índice único
          const duplicateField = Object.keys(error.keyPattern)[0];
      
          let errorMessage = '';
          if (duplicateField === 'email') {
            errorMessage = 'El correo electrónico ya está en uso.';
          } else if (duplicateField === 'alias') {
            errorMessage = 'El alias ya está en uso.';
          } else {
            errorMessage = error.message;
          }
      
          res.status(400).json({ message: errorMessage });
        } else {
          // Otros errores
          res.status(400).json({ message: error.message });
        }
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.json({ message: 'Usuario eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
