import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Area, Biome, AreaBiome } from './models';

@Module({
  imports: [SequelizeModule.forFeature([Area, Biome, AreaBiome])],
  controllers: [AreasController],
  providers: [AreasService],
  exports: [SequelizeModule],
})
export class AreasModule {}
