const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');

// Verifica si las credenciales están registradas en la base de datos
const verifyCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      throw new Error('Credenciales incorrectas');
    }
    return user._id.toString();
  } catch (error) {
    throw error;
  }
};

// Genera una cadena aleatoria y segura de 32 bytes
const generateSecretKey = (userId) => {
  const userSpecificData = userId;
  const secretKey = crypto.createHash('sha256').update(userSpecificData).digest('hex');
  return secretKey;
};

const expiresIn = '1h';

const generateToken = (userId) => {
  const secretKey = generateSecretKey(userId);
  return jwt.sign({ userId }, secretKey, { expiresIn });
};

// Verifica un token JWT y devuelve el ID de usuario si es válido
const verifyToken = (token) => {
  try {
    const rewriteToken =  token.replace('Bearer ', '');
    // Si la verificación es exitosa, el token es válido
    return jwt.decode(rewriteToken);
  } catch (error) {
    // Si hay un error durante la verificación, el token no es válido
    console.error('Error al verificar el token:', error.message);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyCredentials,
  verifyToken
};
