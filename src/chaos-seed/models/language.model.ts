import {
  Model,
  AutoIncrement,
  Column,
  ForeignKey,
  PrimaryKey,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { Identifiable } from 'src/common/interfaces';
import { Race } from './race.model';

@Table
export class Language extends Model<Language> implements Identifiable {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  declare name: string;

  @HasMany(() => Race)
  declare races?: Race[];
}
