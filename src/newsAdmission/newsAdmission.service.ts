import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewsAdmission } from './newsAdmission.model';
import { AddNewsAdmissionDto } from './dto/addNewsAdmission.dto';

@Injectable()
export class NewsAdmissionService {
  constructor(
    @InjectModel('NewsAdmission') private readonly newsModel: Model<NewsAdmission>,
  ) { }

  async insertNews(addNewsAdmissionDto: AddNewsAdmissionDto): Promise<NewsAdmission> {
    const { content, news_date, title } = addNewsAdmissionDto;

    const news = new this.newsModel({
      content: content,
      news_date: news_date,
      title: title,
    });

    const result = await news.save();
    return result;
  }

  async getListNews(): Promise<NewsAdmission[]> {
    // const listNews = await this.newsModel.find({});
    const listNews = await this.newsModel.find({}).sort({ news_date: -1 }).limit(10).select('slug title news_date');

    return listNews;
  }

  async getNewsBySlug(_slug: string): Promise<NewsAdmission> {
    // const listNews = await this.newsModel.find({});
    const news = await this.newsModel.findOne({ slug: _slug });

    if (news === null) {
      throw new NotFoundException();
    }

    return news;
  }

  async getNewsByAmount(perPage: number, sortCondition: string, Page: number) {
    const condition = sortCondition === "desc" ? sortCondition : "asc";
    const news = await this.newsModel.find().limit(perPage).sort({
      news_date: condition
    }).skip((Page - 1) * perPage).exec();

    return news;
  }
}
