import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TuitionsService } from './tuitions.service';
import { TuitionSchema } from './tuition.model';
import { TuitionsController } from './tuitions.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tuition', schema: TuitionSchema }]),
  ],
  controllers: [TuitionsController],
  providers: [TuitionsService],
})

export class TuitionsModule {}