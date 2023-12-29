import { Document, SchemaOptions } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

const options: SchemaOptions = {
  id: false,
  collection: 'socket_model',
  timestamps: true,
};

@Schema(options)
export class SocketModel extends Document {
  @Prop({
    unique: true,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  userName: string;

  public get getId(): string {
    return this.id;
  }

  public get getUserName(): string {
    return this.userName;
  }
}

export const SocketsSchema = SchemaFactory.createForClass(SocketModel);
