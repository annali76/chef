import { NestFactory } from '@nestjs/core';
import ApiModule from './modules/api/api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  await app.listen(3000);
}

bootstrap();
