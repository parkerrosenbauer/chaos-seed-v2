import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ChaosSeedsService } from './chaos-seeds.service';
import { CreateChaosSeedDto, CreateDeadChaosSeedDto } from './dto';
import { InitializeChaosSeed } from './pipes';
import { ChaosSeed } from './models/chaos-seed.model';

@Controller('chaos-seed')
export class ChaosSeedsController {
  constructor(private readonly chaosSeedsService: ChaosSeedsService) {}

  @Post()
  async create(@Body(InitializeChaosSeed) chaosSeed: CreateChaosSeedDto) {
    return await this.chaosSeedsService.create(chaosSeed);
  }

  @Post('dead-on-arrival')
  async createDead(@Body() chaosSeed: CreateDeadChaosSeedDto) {
    return await this.chaosSeedsService.createDead(chaosSeed);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ChaosSeed> {
    return await this.chaosSeedsService.findOne(id);
  }

  @Get()
  async findAll() {
    return await this.chaosSeedsService.findAll();
  }

  @Get('random-starting-location')
  getRandomStartingLocation() {
    return this.chaosSeedsService.getRandomStartingLocation();
  }
}
