import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { applytemp } from './applytemp.entity';
import { ApplyTempController } from './applytemp.controller';
import { ApplyTempService } from './applytemp.service';
import { StatisticModule } from 'src/statistic/statistic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([applytemp]),
    StatisticModule
  ],
  controllers: [ApplyTempController],
  providers: [ApplyTempService],
})

export class ApplyTempModule {}