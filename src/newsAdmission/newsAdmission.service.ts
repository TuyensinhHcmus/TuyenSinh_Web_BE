import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not, MoreThan } from 'typeorm';

import { news } from './newsAdmission.entity';
import { AddNewsAdmissionDto } from './dto/addNewsAdmission.dto';
import { IPaginationMeta, IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { UpdateNewsDto } from './dto/upadteNewAdmission.dto';
var slug = require('slug')

@Injectable()
export class NewsAdmissionService {
  constructor(
    @InjectRepository(news)
    private readonly newsRepo: Repository<news>,
  ) { }

  async insertNews(addNewsAdmissionDto: AddNewsAdmissionDto): Promise<news> {
    try {
      const { title, content, dateCreate, creator, state, typeOfTrainingID, typeOfProgram, newsImage } = addNewsAdmissionDto;

      const news = this.newsRepo.create({
        newsTitle: title,
        newsContent: content,
        newsDateCreate: dateCreate,
        newsCreator: creator,
        newsState: state,
        newsSlug: slug(title) + "-" + (new Date()).getTime(),
        newsTypeOfTrainingID: typeOfTrainingID,
        newsTypeOfProgram: typeOfProgram,
        newsImage: newsImage
      });

      const result = await this.newsRepo.save(news);
      return result;
    } catch (error) {
      throw new HttpException("Thêm tin tức không thành công", HttpStatus.BAD_REQUEST)
    }
  }

  async updateNews(id: number, updateDto: UpdateNewsDto): Promise<news> {
    const { title, content, state, typeOfTrainingID, typeOfProgram, image } = updateDto;

    let isExist = await this.newsRepo.find({ newsId: id });

    if (isExist.length === 0) {
      throw new HttpException("News is not Existed", 404);
    }

    const news = isExist[0];

    news.newsTitle = title;
    news.newsContent = content;
    news.newsState = state;
    news.newsTypeOfTrainingID = typeOfTrainingID;
    news.newsTypeOfProgram = typeOfProgram;
    news.newsImage = image;

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

  async searchNews(
    perPage: number,
    sortCondition: string,
    page: number,
    keyword: string,
    typeOfTraining: string,
    typeOfProgram: string
  ) {

    // console.log('type oftraining', typeOfTraining, typeof typeOfTraining, typeof page, keyword, typeOfProgram,typeof perPage);

    const condition = sortCondition === "DESC" ? -1 : 1;

    const [news, newsTotal] = await Promise.all([
      this.newsRepo.find({
        where: {
          newsTitle: keyword === undefined || keyword === "" ? Like('%') : Like(`%${keyword}%`),
          newsTypeOfTrainingID: typeOfTraining === undefined || typeOfTraining === "" ? Like('%') : typeOfTraining,
          newsTypeOfProgram: typeOfProgram === undefined || typeOfProgram === "" ? Like('%') : typeOfProgram,
          newsState: Not('hidden')
        },
        take: perPage,
        order: {
          newsDateCreate: condition
        },
        skip: (page - 1) * perPage
      }),
      this.newsRepo.count({
        where: {
          newsTitle: keyword === undefined || keyword === "" ? Like('%') : Like(`%${keyword}%`),
          newsTypeOfTrainingID: typeOfTraining === undefined || typeOfTraining === "" ? Like('%') : typeOfTraining,
          newsTypeOfProgram: typeOfProgram === undefined || typeOfProgram === "" ? Like('%') : typeOfProgram,
          newsState: Not('hidden')
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

  getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1);
  }

  async statisticThisMonth() {

    const date = new Date();
    const firstDayCurrentMonth = this.getFirstDayOfMonth(
      date.getFullYear(),
      date.getMonth(),
    );

    const firstDayLastMonth = this.getFirstDayOfMonth(
      date.getFullYear(),
      date.getMonth() > 1 ? date.getMonth() -1 : 12,
    );

    console.log("firstdate", firstDayCurrentMonth, "lastmonth", firstDayLastMonth);
    

    const numNew = this.newsRepo.count({
      where: {
        newsDateCreate: MoreThan(firstDayCurrentMonth)
      }
    })

    const numOld = this.newsRepo.count({
      where: {
        newsDateCreate: MoreThan(firstDayCurrentMonth)
      }
    })

    console.log("numNew", numNew, "numOld", numOld);
    

  }
}
