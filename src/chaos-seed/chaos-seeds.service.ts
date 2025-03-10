import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChaosSeed } from './models/chaos-seed.model';
import { CreateChaosSeedDto, CreateDeadChaosSeedDto } from './dto';

@Injectable()
export class ChaosSeedsService {
  constructor(
    @InjectModel(ChaosSeed) private chaosSeedModel: typeof ChaosSeed,
  ) {}

  async create(chaosSeed: CreateChaosSeedDto): Promise<ChaosSeed> {
    return await this.chaosSeedModel.create(chaosSeed as ChaosSeed);
  }

  async createDead(chaosSeed: CreateDeadChaosSeedDto): Promise<ChaosSeed> {
    return await this.chaosSeedModel.create(chaosSeed as ChaosSeed);
  }

  async findOne(id: number): Promise<ChaosSeed> {
    const chaosSeed = await this.chaosSeedModel.findByPk(id);
    if (!chaosSeed) {
      throw new NotFoundException('Chaos seed not found', {
        cause: new Error(),
        description: id.toString(),
      });
    }
    return chaosSeed;
  }

  async findAll(): Promise<ChaosSeed[]> {
    return await this.chaosSeedModel.findAll();
  }

  getRandomStartingLocation() {
    return 'Retrieving a random starting location';
  }
}
