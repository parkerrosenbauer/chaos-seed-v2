import { Randomizable } from 'src/common/interfaces';
import { CreateChaosSeedDto, CreateDeadChaosSeedDto } from '../dto';

export const mockChaosSeeds = [
  {
    id: 3,
    startingAreaId: 1,
    name: 'Heman',
    level: 1,
    xp: 0,
    alignment: 0,
    reputation: 'Level 1 Who are you again?',
    health: 100,
    mana: 100,
    stamina: 100,
    strength: 10,
    agility: 10,
    dexterity: 10,
    constitution: 10,
    endurance: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    luck: 10,
    resistances: 'None ',
    weaknesses: 'None ',
    skills: 'None',
    marks: 'None',
    isDeadOnArrival: false,
    raceId: null,
    createdAt: '2025-03-14T00:39:40.092Z',
    updatedAt: '2025-03-14T00:39:40.092Z',
  },
  {
    id: 4,
    startingAreaId: 1,
    name: 'Heman',
    level: 1,
    xp: 0,
    alignment: 0,
    reputation: 'Level 1 Who are you again?',
    health: 100,
    mana: 100,
    stamina: 100,
    strength: 10,
    agility: 10,
    dexterity: 10,
    constitution: 10,
    endurance: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    luck: 10,
    resistances: 'None ',
    weaknesses: 'None ',
    skills: 'None',
    marks: 'None',
    isDeadOnArrival: false,
    raceId: null,
    createdAt: '2025-03-14T00:44:00.434Z',
    updatedAt: '2025-03-14T00:44:00.434Z',
  },
];

export const mockChaosSeedDto: CreateChaosSeedDto = {
  startingAreaId: 1,
  name: 'Heman8008',
};

export const mockDeadChaosSeedDto: CreateDeadChaosSeedDto = {
  startingAreaId: 16,
  isDeadOnArrival: true,
};

interface MockRandomizable extends Randomizable {
  id: number;
  name: string;
  description: string;
  chance: number;
}

export const abilityArray: MockRandomizable[] = [
  { id: 1, name: 'Test', description: 'Desc', chance: 5 },
];

export const raceArray: MockRandomizable[] = [
  { id: 1, name: 'Test', description: 'Desc', chance: 5 },
];
