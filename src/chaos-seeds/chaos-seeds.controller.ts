import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ChaosSeedsService } from './chaos-seeds.service';
import { CreateChaosSeedDto, CreateDeadChaosSeedDto } from './dto';
import { ChaosSeed } from './interfaces';
import { InitializeChaosSeed } from './pipes';

@Controller('chaos-seed')
export class ChaosSeedsController {
  constructor(private readonly chaosSeedsService: ChaosSeedsService) {}

  @Post()
  create(@Body(InitializeChaosSeed) createChaosSeedDto: CreateChaosSeedDto) {
    this.chaosSeedsService.create(createChaosSeedDto);
  }

  @Post('track-death')
  createDead(@Body() createDeadChaosSeedDto: CreateDeadChaosSeedDto) {
    this.chaosSeedsService.create(createDeadChaosSeedDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): ChaosSeed {
    const chaosSeed = this.chaosSeedsService.findOne(id);
    if (!chaosSeed) {
      throw new NotFoundException('Chaos seed not found', {
        cause: new Error(),
        description: id,
      });
    }
    return chaosSeed;
  }

  @Get('random-starting-location')
  getRandomStartingLocation() {
    return this.chaosSeedsService.getRandomStartingLocation();
  }
}
