import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MajorsService } from './majors.service';
import { major } from './major.entity';
import { MajorsController } from './majors.controller'


@Module({
  imports: [
    TypeOrmModule.forFeature([major]),
  ],
  controllers: [MajorsController],
  providers: [MajorsService],
})

export class MajorsModule {}