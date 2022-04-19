import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { typeProgram } from './typeProgram.entity';

@Injectable()
export class TypeProgramsService {
  constructor(
    @InjectRepository(typeProgram)
    private readonly typeProgramsRepo: Repository<typeProgram>,
  ) {}

  async getTypePrograms(): Promise<typeProgram []> {
    const typePrograms = await this.typeProgramsRepo.find({});
    return typePrograms;
  }
}
