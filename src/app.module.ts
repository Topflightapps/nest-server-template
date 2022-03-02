import path from 'path';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WebSocketModule } from './modules/websocket/socket.module';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

const TYPEORM_CONFIG: any = config.get('typeorm');
const REDIS_CONFIG: any = config.get('redis');

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      ...TYPEORM_CONFIG,
      cli: {
        entitiesDir: __dirname + '/database/entity',
        migrationsDir: __dirname + '/database/migration',
      },
      entities: [__dirname + '/database/entity/*{.ts,.js}'],
      migrations: [__dirname + '/database/migration/*{.ts,.js}'],
      namingStrategy: new SnakeNamingStrategy(),
      subscribers: [__dirname + '/database/subscriber/*{.ts,.js}'],
    }),
    RedisModule.register(REDIS_CONFIG),
    WebSocketModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
