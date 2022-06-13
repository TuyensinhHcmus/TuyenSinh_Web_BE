import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MajorsService } from './majors.service';
import { major, majormethod } from './major.entity';
import { MajorsController } from './majors.controller'
import { method } from 'src/methods/method.entity';
import { AdmissionGroupModule } from 'src/admissionGroup/admissionGroup.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([major, method, majormethod]),
    AdmissionGroupModule
  ],
  controllers: [MajorsController],
  providers: [MajorsService],
  exports: [MajorsService]
})

export class MajorsModule {}