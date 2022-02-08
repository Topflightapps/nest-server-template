import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as config from 'config';
import { Socket, Server } from 'socket.io';

const wsPort: number = config.get('app.ws_port');

@WebSocketGateway(wsPort)
export class AppSocketServer implements OnGatewayConnection {
  @WebSocketServer()
  public server: Server;

  // constructor() {}

  public handleConnection(client: Socket) {
    console.log('connected');
    console.log(client);
  }
}
