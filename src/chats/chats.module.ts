import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChattingModel, ChattingsSchema } from './models/chattings.models';
import { SocketModel, SocketsSchema } from './models/sockets.models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChattingModel.name, schema: ChattingsSchema },
      { name: SocketModel.name, schema: SocketsSchema },
    ]),
  ],
  providers: [ChatsGateway],
})
export class ChatsModule {}
