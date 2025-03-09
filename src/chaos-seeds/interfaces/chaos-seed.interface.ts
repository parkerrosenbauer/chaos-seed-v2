import { Experienced, Identifiable } from './';

export interface ChaosSeed extends Identifiable, Experienced {
  id: string;
  startingLocation: string;
  name: string;
  level?: number;
  xp?: number;
  race?: string;
  alignment?: number;
  languages?: string;
  reputation?: string;
  health?: number;
  mana?: number;
  stamina?: number;
  strength?: number;
  agility?: number;
  dexterity?: number;
  constitution?: number;
  endurance?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
  luck?: number;
  resistances?: string;
  skills?: string;
  marks?: string;
  abilities?: string[];
  isDeadOnArrival?: boolean;
}
