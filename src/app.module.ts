import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { AuthModule } from './auth/auth.module';
import { RaceModule } from './features/races/race.module';
import { UsersModule } from './features/users/users.module';
import { graphqlErrorFormatter } from './util';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      autoSchemaFile: true,
      errorFormatter: graphqlErrorFormatter,
    }),
    UsersModule,
    RaceModule,
  ],
})
export class AppModule {}
