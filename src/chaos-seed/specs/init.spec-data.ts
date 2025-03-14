import { NestExpressApplication } from '@nestjs/platform-express';
import { ChaosSeedsService } from '../chaos-seeds.service';
import { mockChaosSeeds } from './chaos-seed.spec-data';

export default async function initData(app: NestExpressApplication) {
  const chaosSeedsService = app.get(ChaosSeedsService);
  const chaosSeed1 = await chaosSeedsService.create(mockChaosSeeds[0]);
  const chaosSeed2 = await chaosSeedsService.create(mockChaosSeeds[1]);
}
