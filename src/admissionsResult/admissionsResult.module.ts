import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdmissionsResultService } from './admissionsResult.service';
import { AdmissionsResult} from './admissionsResult.entity';
import { AdmissionsResultController } from './admissionsResult.controller'


@Module({
  imports: [
    TypeOrmModule.forFeature([AdmissionsResult]),
  ],
  controllers: [AdmissionsResultController],
  providers: [AdmissionsResultService],
})

export class AdmissionsResultModule {}