import {
  Controller,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import { AddTypeOfTrainingDto } from './dto/addTypeOfTraining.dto';
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
}
