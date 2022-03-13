import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewsAdmission } from './news-admission.model';
import { AddNewsAdmissionDto } from './dto/add-news-admission.dto';

@Injectable()
export class NewsAdmissionService {
    constructor(
        @InjectModel('NewsAdmission') private readonly newsModel: Model<NewsAdmission>,
      ) {}
    
      async insertNews(addNewsAdmissionDto: AddNewsAdmissionDto): Promise<NewsAdmission> {
        const { newsContent, newsDateCreate, newsTitle } = addNewsAdmissionDto;
    
        const news = new this.newsModel({
            newsContent: newsContent,
            newsDateCreate: newsDateCreate,
            newsTitle: newsTitle,
        });
    
        const result = await news.save();
        return result;
      }
}
