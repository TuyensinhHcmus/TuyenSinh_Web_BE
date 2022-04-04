import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { AddProgramDto } from './dto/add-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

import { ProgramsService } from './programs.service';
import { Program } from './program.model';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  // [GET] /programs
  @Get()
  async getAllPrograms(): Promise<Program[]> {
    const programs = await this.programsService.getPrograms();
    return programs;
  }

  // [POST] /programs
  @Post()
  async addProgram(@Body() addProgramDto: AddProgramDto): Promise<Program> {
    return await this.programsService.insertProgram(addProgramDto);
  }

  // [DELETE] /programs/:id
  @Delete(':id')
  async removeProgram(@Param('id') id: string): Promise<void> {
    return await this.programsService.deleteProgram(id);
  }

  // [GET] /programs/:id
  @Get(':id')
  async getProgram(@Param('id') id: string): Promise<Program> {
    const program = await this.programsService.getSingleProgram(id);
    return program;
  }

  // [PATCH] /programs/:id
  @Patch(':id')
  async updateProgram(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ): Promise<Program> {
    return await this.programsService.updateProgram(id, updateProgramDto);
  }
}
