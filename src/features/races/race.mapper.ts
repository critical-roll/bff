// import type { RaceEntity } from '../../../../ogl-service/src/features/races/entities/race.entity';
import { Race } from './race.entity';

export const mapRaceEntityToRace = ({ uuid, name, speed, alignment, age, size, sizeDescription }: any): Race => ({
  uuid,
  name,
  speed,
  alignment,
  age,
  size,
  sizeDescription,
});
