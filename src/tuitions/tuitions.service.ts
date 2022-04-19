import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddTuitionDto } from './dto/add-tuition.dto';
import { UpdateTuitionDto } from './dto/update-tuition.dto';
import { tuition } from './tuition.entity';

@Injectable()
export class TuitionsService {
  constructor(
    @InjectRepository(tuition)
    private readonly tuitionsRepo: Repository<tuition>,
  ) {}

  async getTuitions(): Promise<tuition []> {
    const tuitions = await this.tuitionsRepo.find({});
    return tuitions;
  }

  async updateTuition(id: string, updateTuitionDto: UpdateTuitionDto): Promise<tuition> {

    const { content } = updateTuitionDto;

    const tuition = await this.findTuition(id);

    tuition.tuitionContent = content;
   
    await this.tuitionsRepo.update({tuitionId: parseInt(id)}, tuition);

    return tuition;
  }

  private async findTuition(id: string): Promise<tuition> {
    let tuition;

    try {
      tuition = await this.tuitionsRepo.findOne({tuitionId: parseInt(id)});
    } catch (error) {
      throw new NotFoundException('Could not find tuition.');
    }

    if (!tuition) {
      throw new NotFoundException('Could not find tuition.');
    }

    return tuition;
  }
}
