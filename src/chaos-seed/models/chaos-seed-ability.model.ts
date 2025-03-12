import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ChaosSeed } from './chaos-seed.model';
import { Ability } from './ability.model';

@Table
export class ChaosSeedAbility extends Model<ChaosSeedAbility> {
  @ForeignKey(() => ChaosSeed)
  @Column
  declare chaosSeedId: number;

  @ForeignKey(() => Ability)
  @Column
  declare abilityId: number;
}
