const userService = require('../service/user.Service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const login = async (req, res) => {
    const { username, password } = req.body;
    const { status, data } = await userService.login({ username, password });
    res.status(mapStatusHTTP(status)).json(data);
};

const getMe = async (_req, res) => {
    const { username, admin } = _req.locals.user;
    res.status(200).json({ username, admin });
};
const topSecret = async (_req, res) => {
    res.status(200).json({ secretInfo: 'Peter Parker é o Homem-Aranha' });
};

module.exports = {
    login,
    getMe,
    topSecret,
  };