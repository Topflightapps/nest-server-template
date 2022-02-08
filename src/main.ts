import { NestFactory } from '@nestjs/core';
import * as config from 'config';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

const APP_PORT: number = config.get('app.port');
const BODY_PARSER_LIMIT: string = config.get('body_parser_limit');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      frameguard: false,
      noSniff: false,
      xssFilter: false,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  app.use(bodyParser.json({ limit: BODY_PARSER_LIMIT }));

  const options = new DocumentBuilder()
    .setTitle('template')
    .setDescription('template app')
    .setVersion('1.0')
    .addTag('template')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(APP_PORT);
}
bootstrap();
