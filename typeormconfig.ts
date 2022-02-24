import * as config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
console.log('TYPEORM_CONFIG', config);

const TYPEORM_CONFIG: any = config.get('typeorm');

export = {
  cli: {
    migrationsDir: 'src/database/migration',
  },
  entities: [__dirname + '/src/database/entity/*{.js,.ts}'],
  ...TYPEORM_CONFIG,
  migrations: [__dirname + '/src/database/migration/*{.js,.ts}'],
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
  seeds: ['./src/database/seeds/*.seed{.js,.ts}'],
};
