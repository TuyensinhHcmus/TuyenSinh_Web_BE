import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

import { TypeProgramsService } from './typePrograms.service';
import { typeProgram } from './typeProgram.entity';

@Controller('type-programs')
export class TypeProgramsController {
  constructor(private readonly typeProgramsService: TypeProgramsService) {}

  // [GET] /type-programs/getByMethod
  @Get('getByMethod')
  async getByMethod(
    @Query('methodId') methodId: string
  ): Promise<any[]> {
    const typePrograms = await this.typeProgramsService.getByMethod(methodId);
    return typePrograms;
  }

  // [GET] /type-programs
  @Get()
  async getAllTypePrograms(): Promise<typeProgram[]> {
    const typePrograms = await this.typeProgramsService.getTypePrograms();
    return typePrograms;
  }
}
