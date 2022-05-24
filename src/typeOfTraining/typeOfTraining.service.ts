import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTypeOfTrainingDto } from './dto/addTypeOfTraining.dto';
import { UpdateTypeOfTrainingDto } from './dto/updateTypeOfTraining.dto';

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

  async getOne(typeOfTrainingId: string): Promise<typeoftraining> {
    try {
      const typeOfTraining = await this.typeOfTrainingRepo.findOne({typeOfTrainingId: typeOfTrainingId});

      return typeOfTraining;
    } catch (error) {
      throw new NotFoundException('Could not find type of training.');
    }
  }

  async deleteTraining(typeOfTrainingId: string) {
    try {
      await this.typeOfTrainingRepo.delete({typeOfTrainingId: typeOfTrainingId});

      return {
        message: "Đã xóa thành công!"
      }
    } catch (error) {
      throw new NotFoundException('Could not delete this type of training.');
    }
  }

  async updateTraining(updateTypeOfTrainingDto: UpdateTypeOfTrainingDto) {
    try {
      await this.typeOfTrainingRepo.update({typeOfTrainingId: updateTypeOfTrainingDto.typeOfTrainingId}, updateTypeOfTrainingDto);

      return {
        message: "Đã cập nhật thành công!"
      }
    } catch (error) {
      throw new NotFoundException('Could not update this type of training.');
    }
  }
}
