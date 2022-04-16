import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';

import { AddNewsAdmissionDto } from './dto/addNewsAdmission.dto';
import { news } from './newsAdmission.entity';
import { NewsAdmissionService } from './newsAdmission.service';

@Controller('news-admission')
export class NewsAdmissionController {
  constructor(private readonly newsAdmissionService: NewsAdmissionService) { }

  // @Post()
  // async addNews(@Body() addNewsAdmissionDto: AddNewsAdmissionDto): Promise<news> {
  //   return await this.newsAdmissionService.insertNews(addNewsAdmissionDto);
  // }

  @Get('getlist')
  async getAllNewsAdmission(): Promise<news[]> {
    return await this.newsAdmissionService.getListNews();
  }

  @Get('detail/:id')
  async getNewsBySlug(@Param('id') _slug: string): Promise<news> {
    return await this.newsAdmissionService.getNewsBySlug(_slug);
  }

  @Get('getNewsByQuantity')
  async getNumberNews(
    @Query('sortBy') sortBy: string,
    @Query('Page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage: number = 10,
  ): Promise<Pagination<news>> {
    const news = await this.newsAdmissionService.getNewsByAmount(
      {
        limit: perPage,
        page: page
      },
      sortBy.toUpperCase()
    );

    return news;
  }

}
