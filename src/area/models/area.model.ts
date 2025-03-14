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
import { Biome } from './biome.model';
import { AreaBiome } from './area-biome.model';

@Table
export class Area extends Model<Area> implements Identifiable {
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

  @BelongsToMany(() => Biome, () => AreaBiome)
  declare biomes?: Biome[];
}
