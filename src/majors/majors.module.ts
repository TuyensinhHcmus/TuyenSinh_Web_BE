import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MajorsService } from './majors.service';
import { MajorSchema } from './major.model';
import { MajorsController } from './majors.controller'
import { FacultiesModule } from 'src/faculties/faculties.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Major', schema: MajorSchema }]),
    FacultiesModule
  ],
  controllers: [MajorsController],
  providers: [MajorsService],
})

export class MajorsModule {}