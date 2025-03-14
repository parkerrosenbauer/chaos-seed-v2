import { Controller, Get, Post } from '@nestjs/common';
import { AreasService } from './areas.service';

@Controller('area')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get('random-area-biome')
  async findRandomAreaBiome() {
    return await this.areasService.findRandomAreaBiome();
  }

  @Get()
  async findAll() {
    return await this.areasService.findAll();
  }

  @Post('create-lots')
  async createLots() {
    return await this.areasService.createLots();
  }
}
