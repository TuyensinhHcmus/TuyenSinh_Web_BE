import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { news } from './newsAdmission.entity';
import { AddNewsAdmissionDto } from './dto/addNewsAdmission.dto';
import { IPaginationMeta, IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
var slug = require('slug')

@Injectable()
export class NewsAdmissionService {
  constructor(
    @InjectRepository(news)
    private readonly newsRepo: Repository<news>,
  ) { }

  async insertNews(addNewsAdmissionDto: AddNewsAdmissionDto): Promise<news> {
    const { title, content, dateCreate, creator, state, typeOfTrainingID } = addNewsAdmissionDto;

    const news = this.newsRepo.create({
      newsTitle: title,
      newsContent: content,
      newsDateCreate: dateCreate,
      newsCreator: creator,
      newsState: state,
      newsSlug: slug(title)+ "-" + (new Date()).getTime(),
      newsTypeOfTrainingID: typeOfTrainingID
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

  async updateStatus(id: number, status: string) {
    const res = await this.newsRepo.update({ newsId: id }, { newsState: status })
    return res;
  }

  async getNewsBySlug(_slug: string): Promise<news> {
    // const listNews = await this.newsModel.find({});
    const news = await this.newsRepo.findOne({ newsSlug: _slug });

    if (news === null) {
      throw new NotFoundException();
    }

    return news;
  }

  async searchNews(perPage: number, sortCondition: string, page: number, keyword: string, typeOfTraining: string) {

    // console.log('type oftraining', typeOfTraining, typeof typeOfTraining);
    
    const condition = sortCondition === "DESC" ? -1 : 1;

    const [news, newsTotal] = await Promise.all([
      this.newsRepo.find({
        where: {
          newsTitle: Like(`%${keyword}%`),
          newsTypeOfTrainingID: typeOfTraining === undefined || typeOfTraining === "" ? Like('%') : typeOfTraining
        },
        take: perPage,
        order: {
          newsDateCreate: condition
        },
        skip: (page - 1) * perPage
      }),
      this.newsRepo.count({
        where: {
          newsTitle: Like(`%${keyword}%`),
          newsTypeOfTrainingID: typeOfTraining === undefined || typeOfTraining === "" ? Like('%') : typeOfTraining
        }
      })
    ])

    // console.log("typeOfTraining", typeOfTraining,news );
    

    return { newsTotal, news };
  }

  async getNewsByTypeOfTraining(typeOfTraining: string): Promise<news[]> {
    const listNews = await this.newsRepo.find({
      where: { newsTypeOfTrainingID: typeOfTraining },
      order: {
        newsDateCreate: 'ASC'
      }
    }
    )
    return listNews;
  }

  async getNewsByAmount(perPage: number, sortCondition: string, page: number) {

    const condition = sortCondition === "DESC" ? -1 : 1;

    const [news, newsTotal] = await Promise.all([
      this.newsRepo.find({
        take: perPage,
        order: {
          newsDateCreate: condition
        },
        skip: (page - 1) * perPage
      }),
      this.newsRepo.count({})
    ])

    return { newsTotal, news };
  }
}
