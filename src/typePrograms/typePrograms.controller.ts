import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { TypeProgramsService } from './typePrograms.service';
import { typeProgram } from './typeProgram.entity';

@Controller('type-programs')
export class TypeProgramsController {
  constructor(private readonly typeProgramsService: TypeProgramsService) {}

  // [GET] /type-programs
  @Get()
  async getAllTypePrograms(): Promise<typeProgram[]> {
    const typePrograms = await this.typeProgramsService.getTypePrograms();
    return typePrograms;
  }
}
