// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Area, AreaBiome, Biome } from './models';
import { randomChance } from 'src/common/utils';
import { NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AreasService {
  constructor(
    @InjectModel(AreaBiome)
    private areaBiomeModel: typeof AreaBiome,
    @InjectModel(Area)
    private areaModel: typeof Area,
    @InjectModel(Biome) private biomeModel: typeof Biome,
    private sequelize: Sequelize,
  ) {}

  async findRandomAreaBiome(): Promise<AreaBiome> {
    const areaBiomes = await this.areaBiomeModel.findAll();
    if (!areaBiomes.length) {
      throw new NotFoundException('No area biomes found');
    }
    return randomChance<AreaBiome>(areaBiomes);
  }

  async findAll(): Promise<AreaBiome[]> {
    return await this.areaBiomeModel.findAll();
  }

  async createLots() {
    const areas = [
      {
        name: 'The Forest of Nadria',
        description:
          'The Forest of Nadria is a 600.000 square miles area of woodland that is part of the River Peninsula',
      },
      {
        name: 'Rione',
        description:
          'Rione is a kingdom bordering Yves to the northeast, separated by the Serrated Mountains.',
      },
      {
        name: 'The Serrated Mountains',
        description:
          'The Serrated Mountains are a mountain range that separates Rione from Yves.',
      },
      {
        name: 'Firetip Mountains',
        description:
          'The Firetip Mountains are a mountain range that separates the River Peninsula from the rest of the continent.',
      },
      {
        name: 'The River Peninsula',
        description:
          'The River Peninsula is a large peninsula that is home to the kingdoms of Rione and Yves.',
      },
      {
        name: 'Yves',
        description:
          'Yves is a kingdom bordering Rione to the southwest, separated by the Serrated Mountains.',
      },
      {
        name: 'Azergoth Swamp',
        description:
          'The Azergoth Swamp is a large swamp that is part of the River Peninsula.',
      },
    ];
    const biomes = [
      { name: 'Forest', isDeadly: false },
      { name: 'Mountain', isDeadly: false },
      { name: 'Swamp', isDeadly: false },
      { name: 'Small River', isDeadly: false },
      { name: 'Large River', isDeadly: true },
      { name: 'City', isDeadly: false },
      { name: 'Volcano', isDeadly: true },
      { name: 'Ocean', isDeadly: true },
      { name: 'Quick Sand', isDeadly: true },
      { name: 'Cave', isDeadly: false },
    ];
    try {
      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        const nadria = await this.areaModel.create(areas[0], transactionHost);
        const rione = await this.areaModel.create(areas[1], transactionHost);
        const serrated = await this.areaModel.create(areas[2], transactionHost);
        const firetip = await this.areaModel.create(areas[3], transactionHost);
        const river = await this.areaModel.create(areas[4], transactionHost);
        const yves = await this.areaModel.create(areas[5], transactionHost);
        const azergoth = await this.areaModel.create(areas[6], transactionHost);
        const forest = await this.biomeModel.create(biomes[0], transactionHost);
        const mountain = await this.biomeModel.create(
          biomes[1],
          transactionHost,
        );
        const swamp = await this.biomeModel.create(biomes[2], transactionHost);
        const smallRiver = await this.biomeModel.create(
          biomes[3],
          transactionHost,
        );
        const largeRiver = await this.biomeModel.create(
          biomes[4],
          transactionHost,
        );
        const city = await this.biomeModel.create(biomes[5], transactionHost);
        const volcano = await this.biomeModel.create(
          biomes[6],
          transactionHost,
        );
        const ocean = await this.biomeModel.create(biomes[7], transactionHost);
        const quickSand = await this.biomeModel.create(
          biomes[8],
          transactionHost,
        );
        const cave = await this.biomeModel.create(biomes[9], transactionHost);
        await this.areaBiomeModel.bulkCreate(
          [
            { areaId: nadria.id, biomeId: forest.id, chance: 6 },
            { areaId: nadria.id, biomeId: smallRiver.id, chance: 2 },
            { areaId: nadria.id, biomeId: quickSand.id, chance: 1 },
            { areaId: rione.id, biomeId: mountain.id, chance: 4 },
            { areaId: rione.id, biomeId: city.id, chance: 5 },
            { areaId: serrated.id, biomeId: mountain.id, chance: 5 },
            { areaId: serrated.id, biomeId: volcano.id, chance: 1 },
            { areaId: serrated.id, biomeId: cave.id, chance: 2 },
            { areaId: firetip.id, biomeId: mountain.id, chance: 4 },
            { areaId: firetip.id, biomeId: cave.id, chance: 1 },
            { areaId: firetip.id, biomeId: volcano.id, chance: 4 },
            { areaId: river.id, biomeId: largeRiver.id, chance: 2 },
            { areaId: yves.id, biomeId: mountain.id, chance: 5 },
            { areaId: yves.id, biomeId: city.id, chance: 8 },
            { areaId: azergoth.id, biomeId: swamp.id, chance: 4 },
            { areaId: azergoth.id, biomeId: quickSand.id, chance: 2 },
            { areaId: azergoth.id, biomeId: cave.id, chance: 1 },
          ],
          transactionHost,
        );
      });
    } catch (err) {
      console.log('oops', err);
    }
    return 'Done';
  }
}
