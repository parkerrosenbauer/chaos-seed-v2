import {
  Model,
  AllowNull,
  AutoIncrement,
  Column,
  ForeignKey,
  HasOne,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Identifiable, Randomizable } from 'src/common/interfaces';
import { Language } from './language.model';

@Table
export class Race extends Model<Race> implements Identifiable, Randomizable {
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

  @ForeignKey(() => Language)
  @AllowNull(true)
  declare languageId?: number;

  @HasOne(() => Language)
  @AllowNull(true)
  declare language?: Language;
}
