import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChaosSeed } from './models/chaos-seed.model';
import { CreateChaosSeedDto, CreateDeadChaosSeedDto } from './dto';
import {
  Ability,
  ChaosSeedAbility,
  ChaosSeedLanguage,
  Language,
  Race,
} from './models';
import { randomChance, cleanName } from 'src/common/utils';

@Injectable()
export class ChaosSeedsService {
  constructor(
    @InjectModel(ChaosSeed) private chaosSeedModel: typeof ChaosSeed,
    @InjectModel(Race) private raceModel: typeof Race,
    @InjectModel(Ability) private abilityModel: typeof Ability,
    @InjectModel(Language) private languageModel: typeof Language,
    @InjectModel(ChaosSeedLanguage)
    private chaosSeedLanguageModel: typeof ChaosSeedLanguage,
  ) {}

  async create(chaosSeed: CreateChaosSeedDto): Promise<ChaosSeed> {
    chaosSeed.name = cleanName(chaosSeed.name);
    const races = await this.raceModel.findAll();
    const abilities = await this.abilityModel.findAll();
    const randomRace = randomChance<Race>(races);
    const randomAbility = randomChance<Ability>(abilities);
    const racialLanguage = await randomRace.$get('language');
    const commonLanguage = await this.languageModel.findOne({
      where: { name: 'Common' },
    });
    const languages: Language[] = [commonLanguage!];

    if (racialLanguage) {
      languages.push(racialLanguage);
    }

    const newChaosSeed = await this.chaosSeedModel.create({
      ...chaosSeed,
      raceId: randomRace.id,
      abilities: [randomAbility],
      languages: languages,
    } as ChaosSeed);

    await randomRace.$add('chaosSeeds', [newChaosSeed]);
    await randomAbility.$add('chaosSeeds', [newChaosSeed]);

    if (racialLanguage) {
      await this.chaosSeedLanguageModel.create({
        chaosSeedId: newChaosSeed.id,
        languageId: racialLanguage.id,
      } as ChaosSeedLanguage);
    }
    await this.chaosSeedLanguageModel.create({
      chaosSeedId: newChaosSeed.id,
      languageId: commonLanguage!.id,
    } as ChaosSeedLanguage);

    return newChaosSeed;
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

  async findAbilities(id: number): Promise<Ability[]> {
    const chaosSeed = await this.findOne(id);
    return await chaosSeed.$get('abilities');
  }

  async findRace(id: number): Promise<Race> {
    const chaosSeed = await this.findOne(id);
    const race = await chaosSeed.$get('race');
    if (!race) {
      throw new NotFoundException('This chaos seed was never given a race');
    }
    return race;
  }

  async findLanguages(id: number): Promise<Language[]> {
    const chaosSeed = await this.findOne(id);
    return await chaosSeed.$get('languages');
  }
}
