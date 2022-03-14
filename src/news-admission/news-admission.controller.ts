import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddNewsAdmissionDto } from './dto/add-news-admission.dto';
import { NewsAdmission } from './news-admission.model';
import { NewsAdmissionService } from './news-admission.service';

@Controller('news-admission')
export class NewsAdmissionController {
    constructor(private readonly newsAdmissionService: NewsAdmissionService) {}

    @Post()
    async addNews(@Body() addNewsAdmissionDto: AddNewsAdmissionDto): Promise<NewsAdmission> {
      return await this.newsAdmissionService.insertNews(addNewsAdmissionDto);
    }

    @Get('getlist')
    async getAllNewsAdmission(): Promise<NewsAdmission[]> {
      return await this.newsAdmissionService.getListNews();
    }

}
