import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Identifiable, Randomizable } from 'src/common/interfaces';
import { ChaosSeed } from './chaos-seed.model';
import { ChaosSeedAbility } from './chaos-seed-ability.model';

@Table
export class Ability
  extends Model<Ability>
  implements Identifiable, Randomizable
{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @AllowNull(false)
  @Column
  declare name: string;

  @AllowNull(false)
  @Column(DataType.STRING(1000))
  declare description: string;

  @AllowNull(false)
  @Column
  declare chance: number;

  @BelongsToMany(() => ChaosSeed, () => ChaosSeedAbility)
  declare chaosSeeds: ChaosSeed[];
}
