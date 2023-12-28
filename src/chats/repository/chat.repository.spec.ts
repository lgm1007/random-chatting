import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ChattingModel } from '../models/chattings.models';
import { Model } from 'mongoose';
import { ChattingsRepository } from './chattings.repository';

const chattings: ChattingModel[] = [];

describe('ChattingsRepository', () => {
  let mockModel: Model<ChattingModel>;
  let mockRepository: ChattingsRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(ChattingModel.name),
          useValue: Model,
        },
        ChattingsRepository,
      ],
    }).compile();

    mockModel = module.get<Model<ChattingModel>>(
      getModelToken(ChattingModel.name),
    );
    mockRepository = module.get<ChattingsRepository>(ChattingsRepository);
  });

  it('should be defined', () => {
    expect(mockRepository).toBeDefined();
  });

  it('should return a chatting data', async () => {
    const spy = jest
      .spyOn(mockRepository, 'findAll')
      .mockResolvedValue(chattings);

    const result = await mockRepository.findAll();
    expect(spy).toBeCalled();
  });

  it('should findAll data instanceOf Array', async () => {
    jest.spyOn(mockRepository, 'findAll').mockResolvedValue(chattings);

    const result = await mockRepository.findAll();
    expect(result).toBeInstanceOf(Array);
  });
});
