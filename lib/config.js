module.exports = {
  HTTP_SERVER_HOST: process.env.HTTP_SERVER_HOST || '0.0.0.0',
  HTTP_SERVER_PORT: parseInt(process.env.HTTP_SERVER_PORT || '8080'),
  DB_CLIENT: process.env.DB_CLIENT || 'mysql',
  DB_CONNECTION_HOST: process.env.DB_CONNECTION_HOST || '127.0.0.1',
  DB_CONNECTION_PORT: parseInt(process.env.DB_CONNECTION_PORT || '3306'),
  DB_CONNECTION_USERNAME: process.env.DB_CONNECTION_USERNAME || 'dev',
  DB_CONNECTION_PASSWORD: process.env.DB_CONNECTION_PASSWORD || 'dev',
  DB_CONNECTION_DATABASE: process.env.DB_CONNECTION_DATABASE || 'vault-dragon'
};
