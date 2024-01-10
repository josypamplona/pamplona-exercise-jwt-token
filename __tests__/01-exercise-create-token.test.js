const jwt = require('jsonwebtoken');
const { requirements } = require('../.trybe/requirements.json');

const authPath = '../src/utils/auth';

describe(requirements[0].description, () => {
  it('Verifica existe um arquivo chamado auth no diretório "src/utils/"', () => {
    const auth = require(authPath);

    expect(auth).toBeDefined();
  });

  it('Verifica se a função `createToken` existe', () => {
    const auth = require(authPath);

    expect(typeof auth.createToken).toBe('function');
  });

  it('Verifica se a função `createToken` retorna um token válido', () => {
    const auth = require(authPath);

    const token = auth.createToken({ username: 'firstuser', admin: false });

    expect(() => jwt.verify(token, process.env.JWT_SECRET)).not.toThrow();
  });

  it('Verifica se a função `createToken` retorna um token criado com o algoritmo `HS256`', () => {
    const auth = require(authPath);

    const token = auth.createToken({ username: 'firstuser', admin: false });

    expect(() => jwt.verify(token, process.env.JWT_SECRET, {algorithms: 'HS256'})).not.toThrow();
  });

  it('Verifica se a função `createToken` retorna um token válido com o payload correto', () => {
    const auth = require(authPath);

    const token = auth.createToken({ username: 'firstuser', admin: false });

    const payload = jwt.decode(token);

    expect(payload.username).toBe('firstuser');
    expect(payload.admin).toBe(false);
  });

  it('Verifica se a função `createToken` retorna um token com o tempo de expiração correto', () => {
    const auth = require(authPath);

    const token = auth.createToken({ username: 'firstuser', admin: false });

    const payload = jwt.decode(token);

    const now = Math.floor(Date.now() / 1000);

    expect(payload.exp).toBe(now + 60 * 60);
  });
});
