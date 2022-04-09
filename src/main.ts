import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
//import { AtGuard } from './common/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // to validation data when register
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new AtGuard())
  app.use(cors());

  await app.listen(process.env.PORT || '3001');
}
bootstrap();
