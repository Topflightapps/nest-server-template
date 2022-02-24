import { Injectable } from '@nestjs/common';
import * as config from 'config';
const APP_PORT: number = config.get('app.port');
const BODY_PARSER_LIMIT: string = config.get('body_parser_limit');

@Injectable()
export class AppService {
  getHello(): string {
    
    return 'Hello World!';
  }
}
