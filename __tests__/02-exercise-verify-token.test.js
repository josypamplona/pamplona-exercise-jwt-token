const { requirements } = require('../.trybe/requirements.json');

const authPath = '../src/utils/auth';

describe(requirements[1].description, () => {
  it('Verifica existe um arquivo chamado auth no diretório "src/utils/"', () => {
    const auth = require(authPath);

    expect(auth).toBeDefined();
  });
  
  it('Verifica se a função `verify` existe', () => {
    
    const auth = require(authPath);

    expect(typeof auth.verify).toBe('function');
    
   
  });

  it('Verifica se a função `verify` retorna o payload correto', () => {
    
    const auth = require(authPath);

    const token = auth.createToken({ username: 'firstuser', admin: false });

    const payload = auth.verify(token);

    expect(payload.username).toBe('firstuser');
    expect(payload.admin).toBe(false);
    
   
  });

  it('Verifica se a função `verify` reconhece um token válido', () => {
    
    const auth = require(authPath);

    const token = auth.createToken({ username: 'firstuser', admin: false });

    expect(() => auth.verify(token)).not.toThrow();
    
   
  });

  it('Verifica se a função `verify` reconhece um token inválido', () => {
    
    const auth = require(authPath);

    const token = auth.createToken({ username: 'firstuser', admin: false });

    const invalidToken = `${token}a`;

    expect(() => auth.verify(invalidToken)).toThrow();
    
   
  });
});
