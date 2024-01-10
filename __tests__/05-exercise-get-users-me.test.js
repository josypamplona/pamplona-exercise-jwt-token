const frisby = require('frisby');
const jwt = require('jsonwebtoken');
const helper = require('./assets/helper');
const { validUserRequest } = require('./assets/requests');
const assert = require('./assets/constants');
const { requirements } = require('../.trybe/requirements.json');

const invalidToken = jwt.sign({ user: 'me', admin: false }, 'wrong_secret');

describe(requirements[4].description, () => {
  beforeAll(helper.beforeAll);

  it('Caso não seja informado um token no header authorization, retorne o status 401 Unauthorized e a mensagem Token not found', async () => {
    const response = await frisby.get(`${assert.apiURL}/users/me`);
    expect(response.status).toBe(401);
    expect(response.json.error.message).toBe('Token not found');
   
  });

  it('Caso ocorra algum erro ao validar o token, retorne o status 401 Unauthorized e a mensagem de erro da biblioteca', async () => {
    const res = await frisby
      .setup({ request: { headers: { Authorization: invalidToken } } })
      .get(`${assert.apiURL}/users/me`);
    expect(res.status).toBe(401);
    expect(res.json.error.message).toBe('invalid signature');

    const response = await frisby
      .setup({
        request: { headers: { Authorization: 'Malformedtokenstring' } },
      })
      .get(`${assert.apiURL}/users/me`);
    expect(response.status).toBe(401);
    expect(response.json.error.message).toBe('jwt malformed');
   
  });

  it('Caso o token seja válido, retorne o status 200 e no corpo da resposta, o nome de usuário ao qual aquele token pertence e o valor da propriedade admin', async () => {
    const {
      json: { token },
    } = await frisby.post(`${assert.apiURL}/login`, validUserRequest);

    const response = await frisby
      .setup({ request: { headers: { Authorization: token } } })
      .get(`${assert.apiURL}/users/me`);
    expect(response.json.username).toBe('firstuser');
    expect(response.json.admin).toBe(false);
   
  });
});
