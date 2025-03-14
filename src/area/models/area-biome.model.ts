import {
  AllowNull,
  AutoIncrement,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Area } from './area.model';
import { Biome } from './biome.model';
import { Identifiable, Randomizable } from 'src/common/interfaces';
import { ChaosSeed } from 'src/chaos-seed/models';

@Table
export class AreaBiome
  extends Model<AreaBiome>
  implements Identifiable, Randomizable
{
  @ForeignKey(() => Area)
  @Column
  declare areaId: number;

  @ForeignKey(() => Biome)
  @Column
  declare biomeId: number;

  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @AllowNull(false)
  @Column
  declare chance: number;

  @HasMany(() => ChaosSeed)
  chaosSeeds?: ChaosSeed[];
}
