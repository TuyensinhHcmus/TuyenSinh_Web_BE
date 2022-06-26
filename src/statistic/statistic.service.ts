import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { NewsAdmissionService } from 'src/newsAdmission/newsAdmission.service';
import { CvsService } from 'src/cv/cv.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class StatisticService {
  constructor(
    private readonly newsService: NewsAdmissionService,
    private readonly userService: UsersService,
    private readonly cvService: CvsService
  ) { }

  async statisticNews() {
    await this.newsService.statisticThisMonth();
  }

  // async getStatusApply(methodId: string): Promise<boolean> {
  //   const method = await this.methodRepo
  //     .createQueryBuilder('method')
  //     .where("(method.methodId = :id) and (CURRENT_TIMESTAMP between method.methodDateStart AND method.methodDateEnd)", { id: methodId })
  //     .getOne()

  //   return !!method;
  // }
}
