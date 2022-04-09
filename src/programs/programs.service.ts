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

  // async insertProgram(addProgramDto: AddProgramDto): Promise<Program> {
  //   const { name, programId, url } = addProgramDto;

  //   const program = new this.programModel({
  //     programName: name,
  //     programId: programId,
  //     programUrl: url
  //   });

  //   const result = await program.save();
  //   return result;
  // }

  async getPrograms(): Promise<program[]> {
    const programs = await this.programRepo.find({});

    return programs;
  }

  // async deleteProgram(id: string): Promise<void> {
  //   try {
  //     await this.programModel.deleteOne({ _id: id }).exec();
  //   } catch (err) {
  //     throw new NotFoundException('Could not delete program.', err);
  //   }
  // }

  async getSingleProgram(id: string): Promise<program> {
    const program = await this.findProgram(id);
    return program;
  }

  // async updateProgram(id: string, updateProgramDto: UpdateProgramDto): Promise<Program> {

  //   const { name, programId, url } = updateProgramDto;

  //   const program = await this.findProgram(id);

  //   program.programName = name;
  //   program.programId = programId;
  //   program.programUrl = url;

  //   program.save();
    
  //   return program;
  // }

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
