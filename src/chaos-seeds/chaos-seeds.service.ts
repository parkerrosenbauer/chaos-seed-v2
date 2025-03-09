import { Injectable } from '@nestjs/common';
import { ChaosSeed } from './interfaces';

@Injectable()
export class ChaosSeedsService {
  private readonly chaosSeeds: ChaosSeed[] = [];

  create(chaosSeed: ChaosSeed) {
    this.chaosSeeds.push(chaosSeed);
  }

  createDead(chaosSeed: ChaosSeed) {
    chaosSeed.isDeadOnArrival = true;
    this.chaosSeeds.push(chaosSeed);
  }

  findOne(id: string): ChaosSeed | undefined {
    return this.chaosSeeds.find((chaosSeed) => chaosSeed.id === id);
  }

  getRandomStartingLocation() {
    return 'Retrieving a random starting location';
  }
}
