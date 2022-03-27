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
    const { name, programId, url } = addProgramDto;

    const program = new this.programModel({
      programName: name,
      programId: programId,
      programUrl: url
    });

    const result = await program.save();
    return result;
  }

  async getPrograms(): Promise<Program[]> {
    const programs = await this.programModel.find({});

    return programs;
  }

  async deleteProgram(id: string): Promise<void> {
    try {
      await this.programModel.deleteOne({ _id: id }).exec();
    } catch (err) {
      throw new NotFoundException('Could not delete program.', err);
    }
  }

  async getSingleProgram(id: string): Promise<Program> {
    const program = await this.findProgram(id);
    return program;
  }

  async updateProgram(id: string, updateProgramDto: UpdateProgramDto): Promise<Program> {

    const { name, programId, url } = updateProgramDto;

    const program = await this.findProgram(id);

    program.programName = name;
    program.programId = programId;
    program.programUrl = url;

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
