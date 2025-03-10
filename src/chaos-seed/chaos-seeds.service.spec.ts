import { Test, TestingModule } from '@nestjs/testing';
import { ChaosSeedsService } from './chaos-seeds.service';
import { ChaosSeed } from './models/chaos-seed.model';
import { getModelToken } from '@nestjs/sequelize';
import { CreateChaosSeedDto, CreateDeadChaosSeedDto } from './dto';

const chaosSeedsArray = [
  {
    startingLocation: 'here',
    name: 'Heman8008',
  },
  {
    startingLocation: 'volcano',
    name: 'Unknown',
  },
];

const chaosSeed: CreateChaosSeedDto = {
  startingLocation: 'here',
  name: 'Heman8008',
};

const deadChaosSeed: CreateDeadChaosSeedDto = {
  startingLocation: 'volcano',
  isDeadOnArrival: true,
};

describe('ChaosSeedsService', () => {
  let chaosSeedsService: ChaosSeedsService;
  let chaosSeedModel: typeof ChaosSeed;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChaosSeedsService,
        {
          provide: getModelToken(ChaosSeed),
          useValue: {
            findAll: jest.fn(() => chaosSeedsArray),
            findByPk: jest.fn().mockResolvedValue({ id: 1, ...chaosSeed }),
            create: jest.fn().mockResolvedValue(chaosSeed),
          },
        },
      ],
    }).compile();

    chaosSeedsService = module.get<ChaosSeedsService>(ChaosSeedsService);
    chaosSeedModel = module.get<typeof ChaosSeed>(getModelToken(ChaosSeed));
  });

  it('should be defined', () => {
    expect(chaosSeedsService).toBeDefined();
  });

  describe('createDead()', () => {
    it('should successfully insert a dead chaos seed', async () => {
      const createDeadSpy = jest
        .spyOn(chaosSeedModel, 'create')
        .mockResolvedValue(deadChaosSeed);
      await expect(
        chaosSeedsService.createDead({
          startingLocation: 'volcano',
          isDeadOnArrival: true,
        }),
      ).resolves.toEqual(deadChaosSeed);
      expect(createDeadSpy).toHaveBeenCalled();
    });
  });

  describe('create()', () => {
    it('should successfully insert a chaos seed', async () => {
      await expect(
        chaosSeedsService.create({
          startingLocation: 'here',
          name: 'Heman8008',
        }),
      ).resolves.toEqual(chaosSeed);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await chaosSeedsService.findAll();
      expect(users).toEqual(chaosSeedsArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const findSpy = jest.spyOn(chaosSeedModel, 'findByPk');
      expect(chaosSeedsService.findOne(1));
      expect(findSpy).toHaveBeenCalledWith(1);
    });
  });
});
