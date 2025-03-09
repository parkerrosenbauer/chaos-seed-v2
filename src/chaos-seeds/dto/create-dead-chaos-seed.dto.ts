import { IsString, IsUUID } from 'class-validator';

export class CreateDeadChaosSeedDto {
  id: string;
  startingLocation: string;
  name: string;
}
