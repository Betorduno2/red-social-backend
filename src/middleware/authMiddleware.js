const authService = require('../services/authService');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    const decoded = authService.verifyToken(token);
    req.userId = decoded.userId; // Agrega el ID de usuario a la solicitud para usar en las rutas protegidas
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Acceso no autorizado. Token inválido.' });
  }
};

module.exports = authenticateToken;
