import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';

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

  @Post('updatestatus')
  async changeStatus(@Body('newsId') id: number, @Body('status') status: string) {
    return await this.newsAdmissionService.updateStatus(id, status);
  }

  @Get('getlist')
  async getAllNewsAdmission(): Promise<news[]> {
    return await this.newsAdmissionService.getListNews();
  }

  @Get('search')
  async searchNewsByKeyword(
    @Query('keyword') keyword: string,
    @Query('sortBy') sortBy: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('typeOfTraining') typeOfTraining: string,
  ): Promise<any> {
    const { newsTotal, news } = await this.newsAdmissionService.searchNews(perPage, sortBy, page, keyword, typeOfTraining);
    return { newsTotal, news };
  }

  @Get('detail/:id')
  async getNewsBySlug(@Param('id') _slug: string): Promise<news> {
    return await this.newsAdmissionService.getNewsBySlug(_slug);
  }

  @Get('getNewsByQuantity')
  async getNumberNews(
    @Query('sortBy') sortBy: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ): Promise<any> {
    const { newsTotal, news } = await this.newsAdmissionService.getNewsByAmount(perPage, sortBy, page);
    return { newsTotal, news };
  }

  @Get('getNewsByTypeOfTraining')
  async getNewsByTypeOfTraining(
    @Query('TypeOfTraining') typeOfTraining: string
  ): Promise<news[]> {
    return await this.newsAdmissionService.getNewsByTypeOfTraining(typeOfTraining);
  }

}
