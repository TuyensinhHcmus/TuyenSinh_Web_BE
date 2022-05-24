import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { AddTypeOfTrainingDto } from './dto/addTypeOfTraining.dto';
import { UpdateTypeOfTrainingDto } from './dto/updateTypeOfTraining.dto';
import { typeoftraining } from './typeOfTraining.entity';

import { TypeOfTrainingService } from './typeOfTraining.service';

@Controller('typeoftraining')
export class TypeOfTrainingController {
  constructor(private readonly typeOfTrainingService: TypeOfTrainingService) {}

  @Post('add')
  async addTypeOfTraining(@Body() addTypeOfTrainingDto: AddTypeOfTrainingDto): Promise<typeoftraining> {
    return await this.typeOfTrainingService.insertTypeOfTraining(addTypeOfTrainingDto);
  }

  // [GET] /typeoftraining/getall
  @Get('getall')
  async getAllTypeOfTraining()
  {
    return await this.typeOfTrainingService.getAll();
  }

  @Get('getOneTraining')
  async getOneTraining(
    @Query('typeOfTrainingId') typeOfTrainingId: string
  )
  {
    return await this.typeOfTrainingService.getOne(typeOfTrainingId);
  }

  @Delete('deleteTraining')
  async deleteTraining(
    @Query('typeOfTrainingId') typeOfTrainingId: string
  ){
    return await this.typeOfTrainingService.deleteTraining(typeOfTrainingId);
  }

  @Post('updateTraining')
  async updateTraining(
    @Body() updateTypeOfTrainingDto: UpdateTypeOfTrainingDto
  ){
    return await this.typeOfTrainingService.updateTraining(updateTypeOfTrainingDto);
  }
}
