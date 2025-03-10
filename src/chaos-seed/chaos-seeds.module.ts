import { Module, Provider } from '@nestjs/common';
import { ChaosSeedsController } from './chaos-seeds.controller';
import { ChaosSeedsService } from './chaos-seeds.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChaosSeed } from './models/chaos-seed.model';

@Module({
  imports: [SequelizeModule.forFeature([ChaosSeed])],
  controllers: [ChaosSeedsController],
  providers: [ChaosSeedsService],
})
export class ChaosSeedsModule {}
