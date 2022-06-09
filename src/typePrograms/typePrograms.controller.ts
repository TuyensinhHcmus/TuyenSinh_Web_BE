import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  Request,
} from '@nestjs/common';

import { TypeProgramsService } from './typePrograms.service';
import { typeProgram } from './typeProgram.entity';
import { TypeProgramDto } from './dto/add-typeprogram-dto';

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

  // [GET] /type-programs/getByTypeOfTraining
  @Get('getByTypeOfTraining')
  async getByTypeOfTraining(
    @Query('typeOfTrainingID') typeOfTrainingID: string
  ): Promise<any[]> {
    const typePrograms = await this.typeProgramsService.getByTypeOfTraining(typeOfTrainingID);
    return typePrograms;
  }

  // [GET] /type-programs
  @Get()
  async getAllTypePrograms(): Promise<typeProgram[]> {
    const typePrograms = await this.typeProgramsService.getTypePrograms();
    return typePrograms;
  }

  @Get("/:id")
  async getTypeProgramById(@Param("id") id: string): Promise<typeProgram> {
    const typePrograms = await this.typeProgramsService.getTypeProgramById(id);
    return typePrograms;
  }

  @Post("/add")
  async addTypeProgram(@Body() infor: TypeProgramDto): Promise<typeProgram> {
    const typePrograms = await this.typeProgramsService.addTypeProgram(infor);
    return typePrograms;
  }

  @Post("/delete")
  async delteTypeProgram(@Body("typeProgramId") id: string): Promise<any> {
    const res = await this.typeProgramsService.deleteTypeProgram(id);
    return res;
  }
  @Post("/update")
  async updateTypeProgram(@Body() infor: TypeProgramDto): Promise<any> {
    const typePrograms = await this.typeProgramsService.updateTypeProgram(infor);
    return typePrograms;
  }
}
