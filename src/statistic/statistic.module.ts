import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { statisticRepo } from './statistic.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([statisticRepo])],
  controllers: [StatisticController],
  providers: [StatisticService],
  exports: [StatisticService]
})

export class StatisticModule {}