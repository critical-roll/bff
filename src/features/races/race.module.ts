import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RaceResolver } from './race.resolver';

@Module({
  imports: [HttpModule],
  providers: [RaceResolver],
})
export class RaceModule {}
