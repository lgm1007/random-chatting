import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected: ${socket.id} ${socket.nsp.name}`);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected: ${socket.id} ${socket.nsp.name}`);
  }

  afterInit() {
    this.logger.log('init');
  }

  @SubscribeMessage('new_user')
  handleNewUserEvent(
    @MessageBody() userName: string,
    @ConnectedSocket() socket: Socket,
  ): string {
    // userName DB에 적재할 것
    socket.broadcast.emit('user_connected', userName);
    return userName;
  }

  @SubscribeMessage('submit_chat')
  handleSubmitChatEvent(
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ) {
    // userName DB에 적재할 것
    socket.broadcast.emit('new_chat', {
      chat: chat,
      userName: socket.id,
    });
  }
}
