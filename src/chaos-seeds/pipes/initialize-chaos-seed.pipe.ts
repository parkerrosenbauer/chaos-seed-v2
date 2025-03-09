import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ChaosSeed } from '../interfaces';

@Injectable()
export class InitializeChaosSeed
  implements PipeTransform<ChaosSeed, ChaosSeed>
{
  transform(value: ChaosSeed, _metadata: ArgumentMetadata): ChaosSeed {
    const chaosSeed: ChaosSeed = {
      ...value,
      name: this.cleanName(value.name),
      level: 0,
      xp: 0,
      race: this.assignRandomAttribute(),
      alignment: 0,
      languages: 'Common',
      reputation: 'Level 1 "Who are you again?"',
      health: 100,
      mana: 100,
      stamina: 100,
      strength: 10,
      agility: 10,
      dexterity: 10,
      constitution: 10,
      endurance: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      luck: 10,
      resistances: 'None',
      skills: 'None',
      marks: 'None',
      abilities: [this.assignRandomAttribute()],
      isDeadOnArrival: false,
    };

    return chaosSeed;
  }

  private assignRandomAttribute() {
    return 'attribute';
  }

  private cleanName(name: string) {
    return name
      .replace(/[^a-zA-Z\s]/g, '')
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
