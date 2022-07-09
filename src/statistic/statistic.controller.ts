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
  // @Get('/news')
  // async getStatisticNews(): Promise<any> {
  //   const methods = await this.statisticService.statisticNews()
  //   return methods;
  // }

  @Post('getStatisticByYear')
  getStatisticByYear(@Body('year') year: number): Promise<any> {
    const methods = this.statisticService.getStatisticByYear(year)
    return methods;
  }

  @Post('addStatisticUser')
  addStatisticUser(): Promise<any> {
    const res = this.statisticService.addStatisticUser()
    return res;
  }

  @Post('getStatisticCount')
  getStatisticCount(@Body('year') year: number): Promise<any> {
    const res = this.statisticService.getStatisticCount(year)
    return res;
  }

  // // [DELETE] /methods/:id
  // @Delete(':id')
  // async removeMethod(@Param('id') methodId: string): Promise<void> {
  //   return await this.methodsService.deleteMethod(methodId);
  // }

}
