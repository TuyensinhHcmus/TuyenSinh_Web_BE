import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller'
import { UsersModule } from 'src/users/users.module';
import { NewsAdmissionModule } from 'src/newsAdmission/newsAdmission.module';
import { CvsModule } from 'src/cv/cv.module';


@Module({
  imports: [UsersModule, NewsAdmissionModule, CvsModule],
  controllers: [StatisticController],
  providers: [StatisticService],
})

export class StatisticModule {}