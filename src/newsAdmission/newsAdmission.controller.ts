import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { AddNewsAdmissionDto } from './dto/addNewsAdmission.dto';
import { news } from './newsAdmission.entity';
import { NewsAdmissionService } from './newsAdmission.service';

@Controller('news-admission')
export class NewsAdmissionController {
  constructor(private readonly newsAdmissionService: NewsAdmissionService) { }

  @Post()
  async addNews(@Body() addNewsAdmissionDto: AddNewsAdmissionDto): Promise<news> {
    return await this.newsAdmissionService.insertNews(addNewsAdmissionDto);
  }

  @Get('getlist')
  async getAllNewsAdmission(): Promise<news[]> {
    return await this.newsAdmissionService.getListNews();
  }

  @Get('detail/:id')
  async getNewsBySlug(@Param('id') _slug: string): Promise<news> {
    return await this.newsAdmissionService.getNewsBySlug(_slug);
  }

  // @Get('getNewsByQuantity')
  // async getNumberNews(
  //   @Query('sortBy') sortBy: string,
  //   @Query('Page') page: number,
  //   @Query('perPage') perPage: number,
  // ) {
  //   const news = await this.newsAdmissionService.getNewsByAmount(perPage, sortBy, page);
  //   return news;
  // }

}
