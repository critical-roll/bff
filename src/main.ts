import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupLogger } from './util';

(async () => {
  const ctx = await NestFactory.createApplicationContext(AppModule);

  const logger = new Logger();

  const configService = ctx.get(ConfigService);

  const PORT = configService.get<number>('PORT');
  const COOKIE_SECRET = configService.get<string>('COOKIE_SECRET');
  const UI_URL = configService.get<string>('UI_URL');

  await ctx.close();

  const fastifyInstance = fastify({
    logger: {
      level: 'warn',
    },
    disableRequestLogging: true,
  });

  setupLogger(fastifyInstance);

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(fastifyInstance as any));

  app.enableCors({
    origin: UI_URL,
    credentials: true,
  });

  await app.register(fastifyCookie as any, { secret: COOKIE_SECRET });

  await app.listen(PORT);
  logger.log(`Server started on port ${PORT}`);
})();
