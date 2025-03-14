import { Module } from '@nestjs/common';
import { ChaosSeedsController } from './chaos-seeds.controller';
import { ChaosSeedsService } from './chaos-seeds.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  Ability,
  ChaosSeed,
  ChaosSeedAbility,
  ChaosSeedLanguage,
  Language,
  Race,
} from './models';
import { AreaBiome } from 'src/area/models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ChaosSeed,
      Ability,
      Language,
      Race,
      ChaosSeedAbility,
      ChaosSeedLanguage,
      AreaBiome,
    ]),
  ],
  controllers: [ChaosSeedsController],
  providers: [ChaosSeedsService],
  exports: [SequelizeModule],
})
export class ChaosSeedsModule {}
