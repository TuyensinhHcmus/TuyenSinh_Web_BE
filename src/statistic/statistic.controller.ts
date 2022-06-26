import {
  Controller,
  Post,
  Body,
  Get,
  Param,
} from '@nestjs/common';

import { StatisticService } from './statistic.service';


@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}
  // [GET] /methods/:id
  @Get('/news')
  async getStatisticNews(): Promise<any> {
    const methods = await this.statisticService.statisticNews()
    return methods;
  }

  // // [DELETE] /methods/:id
  // @Delete(':id')
  // async removeMethod(@Param('id') methodId: string): Promise<void> {
  //   return await this.methodsService.deleteMethod(methodId);
  // }

}
