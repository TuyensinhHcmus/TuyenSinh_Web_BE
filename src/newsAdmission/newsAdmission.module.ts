import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsAdmissionService } from './newsAdmission.service';
import { NewsAdmissionController } from './newsAdmission.controller';
import { news } from './newsAdmission.entity';
import { AdmissionNotificationsModule } from 'src/admissionNotifications/admissionNotifications.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([news]),
    AdmissionNotificationsModule
  ],
  providers: [NewsAdmissionService],
  controllers: [NewsAdmissionController]
})
export class NewsAdmissionModule {}
