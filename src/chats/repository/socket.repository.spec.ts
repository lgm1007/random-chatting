import { Model } from 'mongoose';
import { SocketModel } from '../models/sockets.models';
import { SocketRepository } from './socket.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

describe('SocketRepository', () => {
  let mockModel: Model<SocketModel>;
  let mockRepository: SocketRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(SocketModel.name),
          useValue: Model,
        },
        SocketRepository,
      ],
    }).compile();

    mockModel = module.get<Model<SocketModel>>(getModelToken(SocketModel.name));
    mockRepository = module.get<SocketRepository>(SocketRepository);
  });

  it('should be defined', () => {
    expect(mockRepository).toBeDefined();
  });

  it('should called a findOne', async () => {
    const socketData: SocketModel = null;
    const socketDataId: string = 'testsocketid';
    const spy = jest.spyOn(mockModel, 'findOne').mockResolvedValue(socketData);

    await mockRepository.findOne(socketDataId);
    expect(spy).toBeCalled();
  });
});
