import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { EntityNotFoundInterceptor } from './core/nest/interceptors/entity-not-found.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.useGlobalInterceptors(new EntityNotFoundInterceptor());
  app.enableCors({ origin: true, credentials: true });

  await app.listen(Number(process.env.PORT), '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
