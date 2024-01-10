const environment = process.env.NODE_ENV || 'test';

const suffix = {
  dev: '-dev',
  development: '-dev',
  test: '-test',
};

const options = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || '3306',
  database:
    `${process.env.MYSQL_DB_NAME || 'jwt_token'}${suffix[environment] || suffix.test}`,
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: process.env.DEBUG !== 'false',
};

module.exports = {
  development: {
    dialect: 'mysql',
    ...options,
  },
  test: {
    dialect: 'mysql',
    ...options,
  },
};
