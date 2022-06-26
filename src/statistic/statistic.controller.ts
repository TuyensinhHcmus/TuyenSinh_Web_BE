import {
  Controller,
  Post,
  Body,
  Get,
  Param,
} from '@nestjs/common';

import { StatisticService } from './statistic.service';


@Controller('methods')
export class StatisticController {
  constructor(private readonly methodsService: StatisticService) {}



  // [GET] /methods/:id
  // @Get('/getlistbytypeoftraining/:id')
  // async getMethodByTypeOfTraining(@Param('id') typeOfTrainingId: string): Promise<method[]> {
  //   const methods = await this.methodsService.getMethodsByTypeOfTrainingId(typeOfTrainingId);
  //   return methods;
  // }

  // // [DELETE] /methods/:id
  // @Delete(':id')
  // async removeMethod(@Param('id') methodId: string): Promise<void> {
  //   return await this.methodsService.deleteMethod(methodId);
  // }

}
