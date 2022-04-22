import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { createQueryBuilder, Repository } from 'typeorm';

import { typeProgram } from './typeProgram.entity';
import { typeProgramMethod } from './typeProgramMethod.entity';

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

  async getByMethod(methodId: string): Promise<any []> {
    
    let typePrograms = await createQueryBuilder()
      .from(typeProgramMethod, 'tpm')
      .where('tpm.methodId = :methodId', { methodId })
      .leftJoinAndSelect(typeProgram, 'tp', 'tp.typeProgramId = tpm.typeProgramId')
      .getRawMany()
          
    typePrograms = typePrograms.map(item => ({
      typeProgramId: item.tp_typeProgramId,
      typeProgramName: item.tp_typeProgramName
    }))
    
    return typePrograms;
  }
}
