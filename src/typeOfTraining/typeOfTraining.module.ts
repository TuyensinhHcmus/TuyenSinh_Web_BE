import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOfTrainingService } from './typeOfTraining.service';
import { typeoftraining } from './typeOfTraining.entity';
import { TypeOfTrainingController } from './typeOfTraining.controller'


@Module({
  imports: [
    TypeOrmModule.forFeature([typeoftraining]),
  ],
  controllers: [TypeOfTrainingController],
  providers: [TypeOfTrainingService],
})

export class TypeOfTrainingModule {}