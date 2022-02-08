module.exports = {
  app: {
    port: 3000,
    ws_port: 80,
  },
  swagger: {
    base_path: '/api/',
  },
  typeorm: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'template',
    password: 'template',
    database: 'template',
    synchronize: false,
    logging: false,
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
  body_parser_limit: '1mb',
  jwt: {
    jwt_secret: 'secret',
    jwt_session: {
      session: false,
    },
  },
  multer: {
    root_uploads_path: './uploads',
  },
};
