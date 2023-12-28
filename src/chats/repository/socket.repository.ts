import { Injectable } from '@nestjs/common';
import { SocketModel } from '../models/sockets.models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SocketRepository {
  constructor(
    @InjectModel(SocketModel.name) private socketModel: Model<SocketModel>,
  ) {}

  async findAll(): Promise<SocketModel[]> {
    return this.socketModel.find();
  }

  async findOne(id): Promise<SocketModel> {
    return this.socketModel.findOne({ id: id });
  }

  async exist(userName) {
    return this.socketModel.exists({ userName: userName });
  }
}
