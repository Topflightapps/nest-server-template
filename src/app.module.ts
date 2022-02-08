import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';

import { AppController } from './app.controller';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WebSocketModule } from './modules/websocket/socket.module';
import { AppService } from './app.service';

const TYPEORM_CONFIG: any = config.get('typeorm');
const REDIS_CONFIG: any = config.get('redis');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...TYPEORM_CONFIG,
      cli: {
        entitiesDir: __dirname + '/entity',
        migrationsDir: __dirname + '/migration',
      },
      entities: [__dirname + '/entity/*{.ts,.js}'],
      migrations: [__dirname + '/migration/*{.ts,.js}'],
      namingStrategy: new SnakeNamingStrategy(),
      subscribers: [__dirname + '/subscriber/*{.ts,.js}'],
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
    AppService,
  ],
})
export class AppModule {}
