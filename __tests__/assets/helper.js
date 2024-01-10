const shell = require('shelljs');

const assets = require('./constants');

module.exports = {
  beforeAll: () => {
    const seqEnv = 
    'sequelize';
    shell.exec([
      assets[seqEnv].drop,
      assets[seqEnv].create,
      assets[seqEnv].migrate,
      assets[seqEnv].seed
    ].join(' && '),
      { silent: process.env.DEBUG === "false" });
  }
}