import { Injectable } from '@nestjs/common';
import { NewsAdmissionService } from 'src/newsAdmission/newsAdmission.service';
import { statisticRepo } from './statistic.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(statisticRepo)
    private readonly statisticRepo: Repository<statisticRepo>,
  ) { }

  // async statisticNews() {
  //   await this.newsService.statisticThisMonth();
  // }

  async getStatisticByYear(year: number) {
    let data = await this.statisticRepo.find({ statisticYear: year })
    return data;
  }

  async getStatisticCount(year: number) {
    const data = await this.statisticRepo.find({ statisticYear: year })
    const sumUser = data.reduce((total, item)=> {
      return total + item.statisticNumberNewUser
    }, 0)
    const sumCV = data.reduce((total, item)=> {
      return total + item.statisticNumberCv
    }, 0)
    const sumNews = data.reduce((total, item)=> {
      return total + item.statisticNumberNews
    }, 0)
    const sumApplyTemp = data.reduce((total, item)=> {
      return total + item.statisticApplyTemp
    }, 0)

    return { sumUser, sumApplyTemp, sumCV, sumNews }
  }

  getMonth() {
    const date = new Date();
    return date.getMonth() + 1;
  }

  getYear() {
    const date = new Date();
    return date.getFullYear()
  }

  async addStatisticUser() {
    const data = await this.statisticRepo.findOne({ statisticYear: this.getYear(), statisticMonth: this.getMonth() })
    let res = await this.statisticRepo.update(
      {
        statisticYear: this.getYear(),
        statisticMonth: this.getMonth()
      },
      {
        ...data,
        statisticNumberNewUser: data.statisticNumberNewUser + 1
      }
    );
  }

  async addStatisticCV() {
    const data = await this.statisticRepo.findOne({ statisticYear: this.getYear(), statisticMonth: this.getMonth() })
    let res = await this.statisticRepo.update(
      {
        statisticYear: this.getYear(),
        statisticMonth: this.getMonth()
      },
      {
        ...data,
        statisticNumberCv: data.statisticNumberCv + 1
      }
    );
  }

  async addStatisticApplyTemp() {
    const data = await this.statisticRepo.findOne({ statisticYear: this.getYear(), statisticMonth: this.getMonth() })
    let res = await this.statisticRepo.update(
      {
        statisticYear: this.getYear(),
        statisticMonth: this.getMonth()
      },
      {
        ...data,
        statisticApplyTemp: data.statisticApplyTemp + 1
      }
    );
  }

  async addStatisticNews() {
    const data = await this.statisticRepo.findOne({ statisticYear: this.getYear(), statisticMonth: this.getMonth() })
    let res = await this.statisticRepo.update(
      {
        statisticYear: this.getYear(),
        statisticMonth: this.getMonth()
      },
      {
        ...data,
        statisticNumberNews: data.statisticNumberNews + 1
      }
    );
  }

  // async getStatusApply(methodId: string): Promise<boolean> {
  //   const method = await this.methodRepo
  //     .createQueryBuilder('method')
  //     .where("(method.methodId = :id) and (CURRENT_TIMESTAMP between method.methodDateStart AND method.methodDateEnd)", { id: methodId })
  //     .getOne()

  //   return !!method;
  // }
}
