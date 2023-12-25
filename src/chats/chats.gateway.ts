import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatsGateway {
  @SubscribeMessage('new_user')
  handleNewUserEvent(
    @MessageBody() userName: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(userName);
  }
}
