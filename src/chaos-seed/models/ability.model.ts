import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Identifiable, Randomizable } from 'src/common/interfaces';

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
  @Column
  declare description: string;

  @AllowNull(false)
  @Column
  declare chance: boolean;
}
