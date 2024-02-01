const authService = require('../services/authService');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const userId = await authService.verifyCredentials(email, password);
    const token = authService.generateToken(userId);

    res.json({ token, userId });
  } catch (error) {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
};
