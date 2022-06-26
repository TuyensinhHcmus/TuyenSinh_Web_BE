import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsAdmissionService } from './newsAdmission.service';
import { NewsAdmissionController } from './newsAdmission.controller';
import { news } from './newsAdmission.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([news]),
  ],
  providers: [NewsAdmissionService],
  controllers: [NewsAdmissionController],
  exports: [NewsAdmissionService]
})
export class NewsAdmissionModule {}
