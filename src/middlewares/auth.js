const { validadorDeToken } = require('../utils/auth');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token === undefined) {
        return res.status(401).json({ error: { message: 'Token not found' } });
      }
      try {
        const user = validadorDeToken(token);
        req.locals = { user };
        // amos chamar a função next para que a requisição continue seu fluxo normalmente - no cenário em que o token enviado é válido.
        next();
      } catch (error) {
        return res.status(401).json({ error: { message: 'jwt malformed' } });
      }
};