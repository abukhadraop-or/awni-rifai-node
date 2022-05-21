module.exports = {
  development: {
    username: 'pguser',
    password: 'pguserpw',
    database: 'crud',
    host: 'db',
    dialect: 'postgres',
    port: '5432',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
