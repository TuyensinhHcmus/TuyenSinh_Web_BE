import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FacultiesService } from './faculties.service';
import { FacultySchema } from './faculty.model';
import { FacultiesController } from './faculties.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Faculty', schema: FacultySchema }]),
  ],
  controllers: [FacultiesController],
  providers: [FacultiesService],
  exports: [FacultiesService]
})

export class FacultiesModule {}