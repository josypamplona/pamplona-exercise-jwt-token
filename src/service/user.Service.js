const Joi = require('joi');
const { User } = require('../models');
const auth = require('../utils/auth');

const bodySchema = Joi.object({
    username: Joi.string().min(5).alphanum().required()
      .messages({
        'string.min': 'O campo "username" deve ter pelo menos 5 caracteres',
        'string.empty': 'O campo "username" é obrigatório',
        'string.required': 'O campo "username" é obrigatório',
      }),
    password: Joi.string().min(5).required()
      .messages({
        'string.min': 'O campo "password" deve ter pelo menos 5 caracteres',
        'string.empty': 'O campo "password" é obrigatório',
        'string.required': 'O campo "password" é obrigatório',
      }),
  });

  const login = async (userCredentials) => {
    const { error } = bodySchema.validate(userCredentials);
    if (error) return { status: 'INVALID_VALUE', data: { error: { message: error.message } } };
  
  const user = await User.findOne({
    where: {
      username: userCredentials.username,
    },
  });
  if (!user || user.password !== userCredentials.password) {
    return { status: 'UNAUTHORIZED', data: { error: { message: 'Usuário ou senha inválidos' } } };
  }
  const { username, admin } = user;
  const token = auth.createToken({ username, admin });
  return { status: 'SUCCESSFUL', data: { token } };
};

module.exports = {
    login,
  };