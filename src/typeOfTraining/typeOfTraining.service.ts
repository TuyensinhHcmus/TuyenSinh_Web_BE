import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTypeOfTrainingDto } from './dto/addTypeOfTraining.dto';

import { typeoftraining } from './typeOfTraining.entity';

@Injectable()
export class TypeOfTrainingService {
  constructor(
    @InjectRepository(typeoftraining) private readonly typeOfTrainingRepo: Repository<typeoftraining>,
  ) {}

  async insertTypeOfTraining(addTypeOfTrainingDto: AddTypeOfTrainingDto): Promise<typeoftraining> {
    const { typeOfTrainingDescription, typeOfTrainingId, typeOfTrainingName } = addTypeOfTrainingDto;

    const typeOfTrainingAddition = await this.typeOfTrainingRepo.create({
      typeOfTrainingDescription,
      typeOfTrainingId,
      typeOfTrainingName
    });

    const result = await this.typeOfTrainingRepo.save(typeOfTrainingAddition);
    return result;
  }

  async getAll(): Promise<typeoftraining[]> {
    const methods = await this.typeOfTrainingRepo.find({});

    return methods;
  }

}
