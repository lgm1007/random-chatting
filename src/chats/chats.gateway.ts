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
import { InjectModel } from '@nestjs/mongoose';
import { ChattingModel } from './models/chattings.models';
import { Model } from 'mongoose';
import { SocketModel } from './models/sockets.models';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor(
    @InjectModel(ChattingModel.name)
    private readonly chattingModel: Model<ChattingModel>,
    @InjectModel(SocketModel.name)
    private readonly socketModel: Model<SocketModel>,
  ) {}

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected: ${socket.id} ${socket.nsp.name}`);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    // 소캣 disconnected 시 DB에서 소캣 정보 삭제
    const user = await this.socketModel.findOne({ id: socket.id });
    if (user) {
      socket.broadcast.emit('disconnect_user', user.userName);
      await user.deleteOne();
    }
    this.logger.log(`disconnected: ${socket.id} ${socket.nsp.name}`);
  }

  afterInit() {
    this.logger.log('init');
  }

  @SubscribeMessage('new_user')
  async handleNewUserEvent(
    @MessageBody() userName: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const exist = await this.socketModel.exists({ userName: userName });
    // userName이 중복인 경우 랜덤으로 숫자 뒤에 붙여줌
    if (exist) {
      userName = `${userName}_${Math.floor(Math.random() * 100)}`;
    }
    // 소캣 정보 DB 적재
    await this.socketModel.create({
      id: socket.id,
      userName: userName,
    });

    socket.broadcast.emit('user_connected', userName);
    return userName;
  }

  @SubscribeMessage('submit_chat')
  async handleSubmitChatEvent(
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ) {
    // 채팅 내용 DB 적재
    const socketObj = await this.socketModel.findOne({ id: socket.id });

    await this.chattingModel.create({
      user: socketObj,
      chat: chat,
    });

    // userName DB에 적재할 것
    socket.broadcast.emit('new_chat', {
      chat: chat,
      userName: socket.id,
    });
  }
}
