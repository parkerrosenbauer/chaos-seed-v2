import { Test, TestingModule } from '@nestjs/testing';
import { ChaosSeedsService } from '../chaos-seeds.service';
import { ChaosSeed } from '../models/chaos-seed.model';
import { getModelToken } from '@nestjs/sequelize';
import {
  Ability,
  ChaosSeedAbility,
  ChaosSeedLanguage,
  Language,
  Race,
} from '../models';
import {
  abilityArray,
  mockChaosSeedDto,
  mockChaosSeeds,
  mockDeadChaosSeedDto,
  raceArray,
} from './chaos-seed.spec-data';

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
            findAll: jest.fn(() => mockChaosSeeds),
            findByPk: jest
              .fn()
              .mockResolvedValue({ id: 1, ...mockChaosSeedDto }),
            create: jest.fn().mockResolvedValue(mockChaosSeedDto),
          },
        },
        {
          provide: getModelToken(Race),
          useValue: {
            findAll: jest.fn().mockResolvedValue(raceArray),
            $get: jest.fn().mockImplementation((prop: 'language') =>
              Promise.resolve({
                id: 1,
                name: 'common',
              }),
            ),
          },
        },
        {
          provide: getModelToken(Ability),
          useValue: {
            findAll: jest.fn().mockResolvedValue(abilityArray),
          },
        },
        {
          provide: getModelToken(Language),
          useValue: {},
        },
        {
          provide: getModelToken(ChaosSeedAbility),
          useValue: {},
        },
        {
          provide: getModelToken(ChaosSeedLanguage),
          useValue: {},
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
        .mockResolvedValue(mockDeadChaosSeedDto);
      await expect(
        chaosSeedsService.createDead({
          startingAreaId: 16,
          isDeadOnArrival: true,
        }),
      ).resolves.toEqual(mockDeadChaosSeedDto);
      expect(createDeadSpy).toHaveBeenCalled();
    });
  });

  describe('create()', () => {
    it('should successfully insert a chaos seed', async () => {
      await expect(
        chaosSeedsService.create({
          startingAreaId: 16,
          name: 'Heman8008',
        }),
      ).resolves.toEqual(mockChaosSeedDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await chaosSeedsService.findAll();
      expect(users).toEqual(mockChaosSeeds);
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
