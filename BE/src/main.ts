import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: {
        origin: '*',
        allowedHeaders: '*',
      },
    },
  );
  await app.listen({
    host: process.env.HOST,
    port: Number(process.env.PORT),
  });
}
bootstrap();
