import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddNewsAdmissionDto } from './dto/add-news-admission.dto';
import { NewsAdmission } from './news-admission.model';
import { NewsAdmissionService } from './news-admission.service';

@Controller('news-admission')
export class NewsAdmissionController {
  constructor(private readonly newsAdmissionService: NewsAdmissionService) { }

  @Post()
  async addNews(@Body() addNewsAdmissionDto: AddNewsAdmissionDto): Promise<NewsAdmission> {
    return await this.newsAdmissionService.insertNews(addNewsAdmissionDto);
  }

  @Get('getlist')
  async getAllNewsAdmission(): Promise<NewsAdmission[]> {
    return await this.newsAdmissionService.getListNews();
  }

  @Get('detail/:id')
  async getNewsBySlug(@Param('id') _slug: string): Promise<NewsAdmission> {
    return await this.newsAdmissionService.getNewsBySlug(_slug);
  }

  @Get('getNewsByQuantity')
  async getNumberNews(
    @Param('sortBy') sortBy: string,
    @Param('Page') page: number,
    @Param('perPage') perPage: number,
  ) {
    const news = await this.newsAdmissionService.getNewsByAmount(perPage, sortBy, page);
    return news;
  }

}
