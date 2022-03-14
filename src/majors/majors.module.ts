import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MajorsService } from './majors.service';
import { MajorSchema } from './major.model';
import { MajorsController } from './majors.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Major', schema: MajorSchema }]),
  ],
  controllers: [MajorsController],
  providers: [MajorsService],
})

export class MajorsModule {}