import { Test, TestingModule } from '@nestjs/testing';
import { ChaosSeedsController } from '../chaos-seeds.controller';
import { ChaosSeedsService } from '../chaos-seeds.service';
import { CreateChaosSeedDto, CreateDeadChaosSeedDto } from '../dto';
import { mockChaosSeedDto, mockDeadChaosSeedDto } from './chaos-seed.spec-data';

describe('ChaosSeedsController', () => {
  let chaosSeedsController: ChaosSeedsController;
  let chaosSeedsService: ChaosSeedsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChaosSeedsController],
      providers: [
        {
          provide: ChaosSeedsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((chaosSeed: CreateChaosSeedDto) =>
                Promise.resolve({ id: 1, ...chaosSeed }),
              ),
            createDead: jest
              .fn()
              .mockImplementation((deadChaosSeed: CreateDeadChaosSeedDto) =>
                Promise.resolve({ id: 1, ...deadChaosSeed }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                startingLocation: 'here',
                name: 'Heman8008',
              },
              {
                startingLocation: 'volcano',
                name: 'Unknown',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                startingLocation: 'here',
                name: 'Heman8008',
                id,
              }),
            ),
          },
        },
      ],
    }).compile();

    chaosSeedsController = app.get<ChaosSeedsController>(ChaosSeedsController);
    chaosSeedsService = app.get<ChaosSeedsService>(ChaosSeedsService);
  });

  it('should be defined', () => {
    expect(chaosSeedsController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a chaos seed', () => {
      expect(chaosSeedsController.create(mockChaosSeedDto)).resolves.toEqual({
        id: 1,
        ...mockChaosSeedDto,
      });
      expect(chaosSeedsService.create).toHaveBeenCalled();
      expect(chaosSeedsService.create).toHaveBeenCalledWith(mockChaosSeedDto);
    });
  });

  describe('createDead()', () => {
    it('should create a dead on arrival chaos seed', () => {
      expect(
        chaosSeedsController.createDead(mockDeadChaosSeedDto),
      ).resolves.toEqual({
        id: 1,
        ...mockDeadChaosSeedDto,
      });
      expect(chaosSeedsService.createDead).toHaveBeenCalled();
      expect(chaosSeedsService.createDead).toHaveBeenCalledWith(
        mockDeadChaosSeedDto,
      );
    });
  });

  describe('findAll()', () => {
    it('should find all chaos seeds', () => {
      expect(chaosSeedsController.findAll()).resolves.toEqual([
        {
          startingLocation: 'here',
          name: 'Heman8008',
        },
        {
          startingLocation: 'volcano',
          name: 'Unknown',
        },
      ]);
      expect(chaosSeedsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a chaos seed', () => {
      expect(chaosSeedsController.findOne(1)).resolves.toEqual({
        startingLocation: 'here',
        name: 'Heman8008',
        id: 1,
      });
      expect(chaosSeedsService.findOne).toHaveBeenCalled();
      expect(chaosSeedsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('findOne()', () => {
    it('should return an error message if chaos seed is not found', () => {
      jest
        .spyOn(chaosSeedsService, 'findOne')
        .mockRejectedValue(new Error('Chaos seed not found'));
      expect(chaosSeedsController.findOne(99)).rejects.toThrow(
        'Chaos seed not found',
      );
      expect(chaosSeedsService.findOne).toHaveBeenCalled();
      expect(chaosSeedsService.findOne).toHaveBeenCalledWith(99);
    });
  });
});
