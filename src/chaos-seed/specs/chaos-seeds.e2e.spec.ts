import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ChaosSeedsModule } from '../chaos-seeds.module';
import { ChaosSeedsService } from '../chaos-seeds.service';
import { INestApplication } from '@nestjs/common';
import { mockChaosSeeds } from './chaos-seed.spec-data';
import { Sequelize } from 'sequelize-typescript';
import { createMemDb } from 'src/common/utils/testing-helpers/createMemDb';
import {
  Ability,
  ChaosSeed,
  ChaosSeedAbility,
  ChaosSeedLanguage,
  Language,
  Race,
} from '../models';

describe('ChaossSeeds', () => {
  let app: INestApplication;
  let chaosSeedsService = { findAll: () => mockChaosSeeds };
  let memDb = Sequelize;

  beforeAll(async () => {
    const memDb = await createMemDb([
      ChaosSeed,
      Race,
      Ability,
      Language,
      ChaosSeedAbility,
      ChaosSeedLanguage,
    ]);
    const moduleRef = await Test.createTestingModule({
      imports: [ChaosSeedsModule],
    })
      .overrideProvider(ChaosSeedsService)
      .useValue(chaosSeedsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('GET /chaos-seeds', () => {
    return request(app.getHttpServer())
      .get('/chaos-seeds')
      .expect(200)
      .expect({ data: chaosSeedsService.findAll() });
  });

  afterAll(async () => {
    await app.close();
  });
});
