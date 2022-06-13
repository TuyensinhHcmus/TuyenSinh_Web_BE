import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { createQueryBuilder, Repository } from 'typeorm';
import { TypeProgramDto } from './dto/add-typeprogram-dto';

import { typeProgram } from './typeProgram.entity';
import { typeProgramMethod } from './typeProgramMethod.entity';

@Injectable()
export class TypeProgramsService {
  constructor(
    @InjectRepository(typeProgram)
    private readonly typeProgramsRepo: Repository<typeProgram>,
  ) { }

  async getTypePrograms(): Promise<typeProgram[]> {
    const typePrograms = await this.typeProgramsRepo.find({});
    return typePrograms;
  }

  async getTypeProgramById(id: string): Promise<typeProgram> {
    const typeProgram = await this.typeProgramsRepo.findOne(id)
    return typeProgram;
  }

  async addTypeProgram(infor: TypeProgramDto): Promise<typeProgram> {

    let isExist = await this.typeProgramsRepo.find({ typeProgramId: infor.typeProgramId })
    // console.log("isaga", isExist);
    

    if (isExist.length> 0) {
      throw new HttpException("Type program is Existed", 409);
    }

    const typeProgram = this.typeProgramsRepo.create({
      ...infor
    });
    const result = await this.typeProgramsRepo.save(typeProgram);

    return result;
  }


  async deleteTypeProgram(id: string): Promise<any> {

    try {
      let res = await this.typeProgramsRepo.delete({ typeProgramId: id });
      if (res.affected > 0) return {error: false}
      return {error: true}
    } catch (err) {
      throw new NotFoundException('Could not delete type program.', err);
    }


  }

  async updateTypeProgram(infor: TypeProgramDto): Promise<any> {
    try {
      let res = await this.typeProgramsRepo.update({ typeProgramId: infor.typeProgramId }, infor);
      if (res.affected > 0)
        return {error: false};
      return {error: true};
    } catch (err) {
      throw new NotFoundException('Could not update type program.', err);
    }
  }

  async getByMethod(methodId: string): Promise<any[]> {

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

  async getByTypeOfTraining(typeOfTrainingID: string): Promise<any[]> {

    let typePrograms = await this.typeProgramsRepo.createQueryBuilder('tp')
      .where('tp.typeProgramTypeOfTrainingID = :typeOfTrainingID', { typeOfTrainingID })
      .getMany()

    return typePrograms;
  }

}
