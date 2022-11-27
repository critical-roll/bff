import { Resolver, Query } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';
// import type { RaceEntity } from '../../../../ogl-service/src/features/races/entities/race.entity';
import { Race } from './race.entity';
import { mapRaceEntityToRace } from './race.mapper';

@Resolver(() => Race)
export class RaceResolver {
  private readonly oglServiceUrl: string;

  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {
    this.oglServiceUrl = this.configService.get<string>('OGL_SERVICE_URL');
  }

  @Query(() => [Race])
  race() {
    return this.httpService
      .get<any[]>(`${this.oglServiceUrl}/races`)
      .pipe(map((races) => races.data.map(mapRaceEntityToRace)));
  }
}
