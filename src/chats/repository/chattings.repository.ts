import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChattingModel } from '../models/chattings.models';
import { Model } from 'mongoose';

@Injectable()
export class ChattingsRepository {
  constructor(
    @InjectModel(ChattingModel.name)
    private chattingModel: Model<ChattingModel>,
  ) {}

  async findAll(): Promise<ChattingModel[]> {
    return this.chattingModel.find();
  }

  async findOne(id): Promise<ChattingModel> {
    return this.chattingModel.findOne({ id: id });
  }
}
