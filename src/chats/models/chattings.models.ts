import { Document, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { SocketModel } from './sockets.models';

const options: SchemaOptions = {
  id: false,
  collection: 'chattings_model',
  timestamps: true,
};

@Schema(options)
export class ChattingModel extends Document {
  @Prop({
    type: {
      _id: { type: Types.ObjectId, required: true, ref: 'socket_model' },
      id: { type: String },
      userName: { type: String, required: true },
    },
  })
  @IsNotEmpty()
  @IsString()
  user: SocketModel;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  chat: string;
}

export const ChattingsSchema = SchemaFactory.createForClass(ChattingModel);
