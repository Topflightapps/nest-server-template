module.exports = {
  app: {
    port: 3000,
    ws_port: 3001,
  },
  swagger: {
    base_path: '/api/',
  },
  typeorm: {
    type: 'postgres',
    host: '3.130.56.4',
    port: 5432,
    username: 'fusion',
    password: 'fusion',
    database: 'nest_template_db',
    synchronize: false,
    logging: false,
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
  body_parser_limit: '1mb',
  jwt: {
    access_token_secret: 'secret',
    refresh_token_secret: 'secret2',
    access_token_expiration: '2h',
    refresh_token_expiration: '1d',
    jwt_session: {
      session: false,
    },
  },
  multer: {
    root_uploads_path: './uploads',
  },
};
