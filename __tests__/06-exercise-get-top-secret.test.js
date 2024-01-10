const frisby = require('frisby');
const jwt = require('jsonwebtoken');
const helper = require('./assets/helper');
const { validUserRequest, adminRequest } = require('./assets/requests');
const assert = require('./assets/constants');
const { requirements } = require('../.trybe/requirements.json');

const SECRET = process.env.JWT_SECRET;

const invalidToken = jwt.sign({ user: 'me', admin: false }, 'wrong_secret');

describe(requirements[5].description, () => {
  beforeAll(helper.beforeAll);

  it('Caso não seja informado um token no header authorization, retorne o status 401 Unauthorized e a mensagem Token not found', async () => {
    const response = await frisby.get(`${assert.apiURL}/top-secret`);
    expect(response.status).toBe(401);
    expect(response.json.error.message).toBe('Token not found');
   
  });

  it('Caso ocorra algum erro ao validar o token, retorne o status 401 Unauthorized e a mensagem de erro da biblioteca', async () => {
    const res = await frisby
      .setup({ request: { headers: { Authorization: invalidToken } } })
      .get(`${assert.apiURL}/top-secret`);
    expect(res.status).toBe(401);
    expect(res.json.error.message).toBe('invalid signature');

    const response = await frisby
      .setup({
        request: { headers: { Authorization: 'Malformedtokenstring' } },
      })
      .get(`${assert.apiURL}/top-secret`);
    expect(response.status).toBe(401);
    expect(response.json.error.message).toBe('jwt malformed');
   
  });

  it('Caso o token seja válido, mas o payload contenha admin com o valor false, retorne status 401 e a mensagem de erro Restricted access', async () => {
    const {
      json: { token },
    } = await frisby.post(`${assert.apiURL}/login`, validUserRequest);

    const response = await frisby
      .setup({ request: { headers: { Authorization: token } } })
      .get(`${assert.apiURL}/top-secret`);
    expect(response.status).toBe(401);
    expect(response.json.error.message).toBe('Restricted access');
   
  });

  it('Caso o token seja válido, e o payload contenha admin com o valor true, retorne status 200 e um corpo com a propriedade secretInfo de valor Peter Parker é o Homem-Aranha', async () => {
    const {
      json: { token },
    } = await frisby.post(`${assert.apiURL}/login`, adminRequest);

    const response = await frisby
      .setup({ request: { headers: { Authorization: token } } })
      .get(`${assert.apiURL}/top-secret`);
    expect(response.status).toBe(200);
    expect(response.json.secretInfo).toBe('Peter Parker é o Homem-Aranha');
   
  });
});
