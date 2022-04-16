import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { news } from './newsAdmission.entity';
import { AddNewsAdmissionDto } from './dto/addNewsAdmission.dto';
import { IPaginationMeta, IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';



@Injectable()
export class NewsAdmissionService {
  constructor(
    @InjectRepository(news) 
    private readonly newsRepo: Repository<news>,
  ) { }

  // async insertNews(addNewsAdmissionDto: AddNewsAdmissionDto): Promise<news> {
  //   const { content, news_date, title } = addNewsAdmissionDto;

  //   const news = new this.newsRepo.create({
  //     newsContent: content,
  //     newsDateCreate: news_date,
  //     newsTitle: title,
  //   });

  //   const result = await news.save();
  //   return result;
  // }

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

  async getNewsByAmount(options: IPaginationOptions, sortCondition): Promise<Pagination<news>> {
    const queryBuilder = this.newsRepo.createQueryBuilder('c');

    sortCondition = sortCondition === 'DESC'? sortCondition:'ASC';
    queryBuilder.orderBy('c.newsDateCreate', sortCondition); 

    return paginate<news>(queryBuilder, options);
  }
}
