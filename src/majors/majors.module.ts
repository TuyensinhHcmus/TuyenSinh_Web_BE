import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MajorsService } from './majors.service';
import { major, majormethod } from './major.entity';
import { MajorsController } from './majors.controller'
import { method } from 'src/methods/method.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([major, method, majormethod]),
  ],
  controllers: [MajorsController],
  providers: [MajorsService],
})

export class MajorsModule {}