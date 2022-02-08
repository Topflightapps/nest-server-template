import * as config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const TYPEORM_CONFIG: any = config.get('typeorm');

export = {
  cli: {
    migrationsDir: 'src/migration',
  },
  entities: [__dirname + '/src/entity/*{.js,.ts}'],
  ...TYPEORM_CONFIG,
  migrations: [__dirname + '/src/migration/*{.js,.ts}'],
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
  seeds: ['./src/seeds/*.seed{.js,.ts}'],
};
