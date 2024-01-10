const { requirements } = require('../.trybe/requirements.json');

describe(requirements[2].description, () => {
  const authMiddlewarePath = '../src/middlewares/auth';
  const authPath = '../src/utils/auth';

  it('Verifica se o middleware de autenticação existe', () => {
    
    const authMiddleware = require(authMiddlewarePath);

    expect(typeof authMiddleware).toBe('function');
    
   
  });

  it('Se o token não for informado, retorne o status 401 Unauthorized e a mensagem Token not found', () => {
    
    const authMiddleware = require(authMiddlewarePath);

    const req = {
      headers: {
        authorization: null,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: { message: 'Token not found' },
    });
    
   
  });

  it('Se o token for inválido, retorne o status 401 Unauthorized e a mensagem "jwt malformed"', () => {
    
    const authMiddleware = require(authMiddlewarePath);

    const req = {
      headers: {
        authorization: 'invalidToken',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: { message: 'jwt malformed' },
    });
    
   
  });

  it('Se o token for válido, chame o próximo middleware', () => {
    

    const authMiddleware = require(authMiddlewarePath);
    const { createToken } = require(authPath);

    const token = createToken({ username: 'firstuser', admin: false });

    const req = {
      headers: {
        authorization: token,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    
   
  });

  it('Se o token for válido, insira o usuário extraído do token no objeto `locals` da requisição', () => {
    
    const authMiddleware = require(authMiddlewarePath);
    const { createToken } = require(authPath);

    const token = createToken({ username: 'firstuser', admin: false });

    const req = {
      headers: {
        authorization: token,
      },
      locals: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(req.locals.user.username).toBe('firstuser');
    expect(req.locals.user.admin).toBe(false);
    
   
  });
});
