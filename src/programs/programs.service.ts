import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddProgramDto } from './dto/add-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

import { Program } from './program.model';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectModel('Program') private readonly programModel: Model<Program>,
  ) {}

  async insertProgram(addProgramDto: AddProgramDto): Promise<Program> {
    const { name } = addProgramDto;

    const program = new this.programModel({
      programName: name,
    });

    const result = await program.save();
    return result;
  }

  async getPrograms(): Promise<Program[]> {
    const programs = await this.programModel.find({});

    return programs;
  }

  async deleteProgram(programId: string): Promise<void> {
    try {
      await this.programModel.deleteOne({ _id: programId }).exec();
    } catch (err) {
      throw new NotFoundException('Could not delete program.', err);
    }
  }

  async getSingleProgram(programId: string): Promise<Program> {
    const program = await this.findProgram(programId);
    return program;
  }

  async updateProgram(id: string, updateProgramDto: UpdateProgramDto): Promise<Program> {

    const { name } = updateProgramDto;

    const program = await this.findProgram(id);

    program.programName = name;

    program.save();
    
    return program;
  }

  private async findProgram(id: string): Promise<Program> {
    let program;

    try {
      program = await this.programModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find program.');
    }

    if (!program) {
      throw new NotFoundException('Could not find program.');
    }

    return program;
  }
}
