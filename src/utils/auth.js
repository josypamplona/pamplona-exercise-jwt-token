const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretJWT';

const JWT_CONFIG = { 
  algorithm: 'HS256', 
  expiresIn: '1h', 
};

const createToken = (payload) => { 
  const token = jwt.sign(payload, JWT_SECRET, JWT_CONFIG);
 return token;
};
/// Para fazer a verificação do token precisamos chamar o método JWT.verify, passando como primeiro parâmetro o 
/// token e como segundo parâmetro o segredo utilizado para gerar o token.
const validadorDeToken = (token) => {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
};
module.exports = {
  createToken,
  validadorDeToken,
};
