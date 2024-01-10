const frisby = require('frisby');
const jwt = require('jsonwebtoken');
const { validUserRequest, adminRequest } = require('./assets/requests');
const helper = require('./assets/helper');

const assets = require('./assets/constants');
const { requirements } = require('../.trybe/requirements.json');

const SECRET = process.env.JWT_SECRET;

describe(requirements[3].description, () => {
  beforeAll(helper.beforeAll);

  it('Caso o username não seja informado ou seja vazio, retorne o status `422` e a mensagem `O campo "username" é obrigatório', async () => {
    const timer = setTimeout(() => expect.fail(), 10000);
    const response = await frisby.post(`${assets.apiURL}/login`, {
      ...validUserRequest,
      username: '',
    });
    expect(response.status).toBe(422);
    expect(response.json.error.message).toBe(
      'O campo "username" é obrigatório',
    );
   
    
  });

  it('Caso o username informado não seja uma string alfanumérica de, pelo menos, 5 caracteres, retorne o status `422` e a mensagem `O campo "username" deve ter pelo menos 5 caracteres`', async () => {
    const timer = setTimeout(() => expect.fail(), 10000);
    const response = await frisby.post(`${assets.apiURL}/login`, {
      ...validUserRequest,
      username: '1234',
    });
    expect(response.status).toBe(422);
    expect(response.json.error.message).toBe(
      'O campo "username" deve ter pelo menos 5 caracteres',
    );
   
    
  });

  it('Caso a senha não seja informada ou seja vazia, retorne o status `422` e a mensagem `O campo "password" é obrigatório', async () => {
    const timer = setTimeout(() => expect.fail(), 10000);
    const response = await frisby.post(`${assets.apiURL}/login`, {
      ...validUserRequest,
      password: '',
    });
    expect(response.status).toBe(422);
    expect(response.json.error.message).toBe(
      'O campo "password" é obrigatório',
    );
   
    
  });

  it('Caso a senha informada não seja uma string de, pelo menos, 5 caracteres, retorne o status `422` e a mensagem `O campo "password" deve ter pelo menos 5 caracteres`', async () => {
    const timer = setTimeout(() => expect.fail(), 10000);
    const response = await frisby.post(`${assets.apiURL}/login`, {
      ...validUserRequest,
      password: '1234',
    });
    expect(response.status).toBe(422);
    expect(response.json.error.message).toBe(
      'O campo "password" deve ter pelo menos 5 caracteres',
    );
   
    
  });

  it('Caso não seja encontrado um usuário com o username informado, retorne o status `401` e a mensagem `Usuário ou senha inválidos`', async () => {
    const timer = setTimeout(() => expect.fail(), 10000);
    const response = await frisby.post(`${assets.apiURL}/login`, {
      ...validUserRequest,
      username: 'notfound',
    });
    expect(response.status).toBe(401);
    expect(response.json.error.message).toBe('Usuário ou senha inválidos');
   
    
  });

  it('Caso seja encontrado um usuário com o username informado, mas a senha não corresponda, retorne o status `401` e a mensagem `Usuário ou senha inválidos`', async () => {
    const timer = setTimeout(() => expect.fail(), 10000);
    const response = await frisby.post(`${assets.apiURL}/login`, {
      ...validUserRequest,
      password: 'notfound',
    });
    expect(response.status).toBe(401);
    expect(response.json.error.message).toBe('Usuário ou senha inválidos');
   
    
  });

  it('Caso sejam informados dados válidos no corpo da requisição, deve retornar status 200 e um token JWT válido', async () => {
    const timer = setTimeout(() => expect.fail(), 10000);
    const response = await frisby.post(
      `${assets.apiURL}/login`,
      validUserRequest,
    );
    expect(response.status).toBe(200);
    expect(response.json.token).toBeDefined();
    expect(() => jwt.verify(response.json.token, SECRET)).not.toThrow();
   
    
  });

  it('Caso o username informado seja admin e a senha seja s3nh4S3gur4, a chave admin no payload do token retornado deve ter o valor true', async () => {
    const timer = setTimeout(() => expect.fail(), 10000);
    const response = await frisby.post(`${assets.apiURL}/login`, adminRequest);
    expect(response.status).toBe(200);
    expect(response.json.token).toBeDefined();
    expect(() => jwt.verify(response.json.token, SECRET)).not.toThrow();
    const payload = jwt.decode(response.json.token);
    expect(payload.admin).toBe(true);
   
    
  });
});
