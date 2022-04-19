import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { cv } from './cv.entity';
import { CvsService } from './cv.service';
import { CvsController } from './cv.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([cv]),
  ],
  controllers: [CvsController],
  providers: [CvsService],
})

export class CvsModule {}