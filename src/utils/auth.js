const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'seusecretdetoken';

const config = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const createToken = (payload) => { 
  try {
    return jwt.sign(payload, JWT_SECRET, config);
  } catch (error) {
    return Error('token não encontrado');
  }
};

const validadorDeToken = (req, res, next) => {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }

  try {
    const token = bearerToken.split(' ')[1];
    const payload = jwt.verify(token, createToken, config);
    req.user = payload.id; 

    next();
  } catch (err) {
    return res.status(401).json({ 
      message: 'Expired or invalid token',
    });
  }
};
module.exports = {
  createToken,
  validadorDeToken,
};
