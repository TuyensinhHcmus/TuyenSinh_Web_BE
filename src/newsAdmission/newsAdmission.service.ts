import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { news } from './newsAdmission.entity';
import { AddNewsAdmissionDto } from './dto/addNewsAdmission.dto';



@Injectable()
export class NewsAdmissionService {
  constructor(
    @InjectRepository(news) 
    private readonly newsRepo: Repository<news>,
  ) { }

  async insertNews(addNewsAdmissionDto: AddNewsAdmissionDto): Promise<news> {
    const { title, content, dateCreate, creator, state, slug } = addNewsAdmissionDto;

    const news = this.newsRepo.create({
      newsTitle: title,
      newsContent: content,
      newsDateCreate: dateCreate,
      newsCreator: creator,
      newsState: state,
      newsSlug: slug
    });

    const result = await this.newsRepo.save(news);
    return result;
  }

  async getListNews(): Promise<news[]> {
    // const listNews = await this.newsModel.find({});
    const listNews = await this.newsRepo.find({})
    //sort({ news_date: -1 }).limit(10).select('slug title news_date');

    return listNews;
  }

  async getNewsBySlug(_slug: string): Promise<news> {
    // const listNews = await this.newsModel.find({});
    const news = await this.newsRepo.findOne({ newsSlug: _slug });

    if (news === null) {
      throw new NotFoundException();
    }

    return news;
  }

  // async getNewsByAmount(perPage: number, sortCondition: string, Page: number) {
  //   const condition = sortCondition === "desc" ? sortCondition : "asc";
  //   const news = await this.newsRepo.find().limit(perPage).sort({
  //     news_date: condition
  //   }).skip((Page - 1) * perPage).exec();

  //   return news;
  // }
}
