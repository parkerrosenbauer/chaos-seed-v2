import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Identifiable } from 'src/common/interfaces';
import { Area } from './area.model';
import { AreaBiome } from './area-biome.model';

@Table
export class Biome extends Model<Biome> implements Identifiable {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @AllowNull(false)
  @Column
  declare name: string;

  @AllowNull(false)
  @Column
  declare isDeadly: boolean;

  @BelongsToMany(() => Area, () => AreaBiome)
  declare areas?: Area[];
}
