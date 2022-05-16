import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { AddProgramDto } from './dto/add-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { program } from './program.entity';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(program) 
    private readonly programRepo: Repository<program>,
  ) {}

  async insertProgram(addProgramDto: AddProgramDto): Promise<program> {
    const { majorId, name, content, documentLink, typeOfTrainingID } = addProgramDto;

    const program = this.programRepo.create({
      programMajorId: majorId,
      programName: name,
      programContent: content,
      programDocumentLink: documentLink,
      programTypeOfTrainingID: typeOfTrainingID
    });

    const result = await this.programRepo.save(program);
    return result;
  }

  async getPrograms(): Promise<program[]> {
    const programs = await this.programRepo.find({});

    return programs;
  }

  async getProgramsByTypeOfTrainingId(typeOfTrainingId: string): Promise<program[]> {
    const programs = await this.programRepo.find({programTypeOfTrainingID: typeOfTrainingId});

    return programs;
  }

  async deleteProgram(id: string): Promise<void> {
    try {
      await this.programRepo.delete({ programId: parseInt(id) });
    } catch (err) {
      throw new NotFoundException('Could not delete program.', err);
    }
  }

  async getSingleProgram(id: string): Promise<program> {
    const program = await this.findProgram(id);
    return program;
  }

  async updateProgram(id: string, updateProgramDto: UpdateProgramDto): Promise<program> {

    const { majorId, name, content, documentLink, typeOfTrainingID } = updateProgramDto;

    await this.programRepo.update({ programId: parseInt(id) }, {
      programId: parseInt(id),
      programMajorId: majorId,
      programName: name,
      programContent: content,
      programDocumentLink: documentLink,
      programTypeOfTrainingID: typeOfTrainingID
    })

    return await this.findProgram(id);
  }

  private async findProgram(id: string): Promise<program> {
    let program;

    try {
      program = await this.programRepo.findOne({programId: parseInt(id)});
    } catch (error) {
      throw new NotFoundException('Could not find program.');
    }

    if (!program) {
      throw new NotFoundException('Could not find program.');
    }

    return program;
  }
}
