import { IsString, IsUUID } from 'class-validator';

export class CreateChaosSeedDto {
  @IsUUID()
  id: string;

  @IsString()
  startingLocation: string;

  @IsString()
  name: string;
}
