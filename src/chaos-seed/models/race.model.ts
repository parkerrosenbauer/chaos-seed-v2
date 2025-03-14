import {
  Model,
  AllowNull,
  AutoIncrement,
  Column,
  ForeignKey,
  HasOne,
  PrimaryKey,
  Table,
  HasMany,
  BelongsToMany,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Identifiable, Randomizable } from 'src/common/interfaces';
import { Language } from './language.model';
import { ChaosSeed } from './chaos-seed.model';

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
  @Column(DataType.STRING(1000))
  declare description: string;

  @AllowNull(false)
  @Column
  declare chance: number;

  @ForeignKey(() => Language)
  @Column
  declare languageId?: number;

  @BelongsTo(() => Language)
  declare language?: Language;

  @HasMany(() => ChaosSeed)
  declare chaosSeeds?: ChaosSeed[];
}
