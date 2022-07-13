import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
//import { AtGuard } from './common/guards';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({
    limit: '50mb'
  }));
  
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
  }));
  
  // to validation data when register
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new AtGuard())
  app.use(cors());

  await app.listen(process.env.PORT || '3001');
}
bootstrap();
