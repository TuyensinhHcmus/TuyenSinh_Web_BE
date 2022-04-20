import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { cv } from './cv.entity';
import { CvsService } from './cv.service';
import { CvsController } from './cv.controller';
import { AspirationModule } from 'src/aspiration/aspiration.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([cv]),
    AspirationModule
  ],
  
  controllers: [CvsController],
  providers: [CvsService],
})

export class CvsModule {}