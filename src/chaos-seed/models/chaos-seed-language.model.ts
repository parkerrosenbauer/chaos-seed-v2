import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ChaosSeed } from './chaos-seed.model';
import { Language } from './language.model';

@Table
export class ChaosSeedLanguage extends Model<ChaosSeedLanguage> {
  @ForeignKey(() => ChaosSeed)
  @Column
  declare chaosSeedId: number;

  @ForeignKey(() => Language)
  @Column
  declare languageId: number;
}
