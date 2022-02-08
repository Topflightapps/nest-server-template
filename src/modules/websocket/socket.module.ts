import { Module } from '@nestjs/common';
import { AppSocketServer } from './app.socket';

@Module({
  exports: [AppSocketServer],
  imports: [],
  providers: [AppSocketServer],
})
export class WebSocketModule {}
