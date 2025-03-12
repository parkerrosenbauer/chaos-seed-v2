import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Experienced } from '../interfaces';
import { Identifiable } from 'src/common/interfaces';
import { Ability } from './ability.model';
import { ChaosSeedAbility } from './chaos-seed-ability.model';
import { Language } from './language.model';
import { ChaosSeedLanguage } from './chaos-seed-language.model';

@Table({
  timestamps: true,
})
export class ChaosSeed
  extends Model<ChaosSeed>
  implements Experienced, Identifiable
{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @AllowNull(false)
  @Column
  declare startingLocation: string;

  @Column({ defaultValue: 'Unknown' })
  declare name: string;

  @Column({ defaultValue: 1 })
  declare level: number;

  @Column({ defaultValue: 0 })
  declare xp: number;

  @Column({ defaultValue: 0 })
  declare alignment: number;

  @Column({ defaultValue: 'Level 1 Who are you again?' })
  declare reputation: string;

  @Column({ defaultValue: 100 })
  declare health: number;

  @Column({ defaultValue: 100 })
  declare mana: number;

  @Column({ defaultValue: 100 })
  declare stamina: number;

  @Column({ defaultValue: 10 })
  declare strength: number;

  @Column({ defaultValue: 10 })
  declare agility: number;

  @Column({ defaultValue: 10 })
  declare dexterity: number;

  @Column({ defaultValue: 10 })
  declare constitution: number;

  @Column({ defaultValue: 10 })
  declare endurance: number;

  @Column({ defaultValue: 10 })
  declare intelligence: number;

  @Column({ defaultValue: 10 })
  declare wisdom: number;

  @Column({ defaultValue: 10 })
  declare charisma: number;

  @Column({ defaultValue: 10 })
  declare luck: number;

  @Column({ defaultValue: 'None ' })
  declare resistances: string;

  @Column({ defaultValue: 'None ' })
  declare weaknesses: string;

  @Column({ defaultValue: 'None' })
  declare skills: string;

  @Column({ defaultValue: 'None' })
  declare marks: string;

  @Column({ defaultValue: false })
  declare isDeadOnArrival: boolean;

  @BelongsToMany(() => Ability, () => ChaosSeedAbility)
  @AllowNull(true)
  declare abilities: [];

  @BelongsToMany(() => Language, () => ChaosSeedLanguage)
  declare languages: [];

  @Column
  declare race?: string;
}
