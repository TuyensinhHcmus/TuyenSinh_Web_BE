import { Module } from '@nestjs/common';
import { NewsAdmissionService } from './news-admission.service';
import { NewsAdmissionController } from './news-admission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from './news-admission.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'NewsAdmission', schema: NewsSchema }]),
  ],
  providers: [NewsAdmissionService],
  controllers: [NewsAdmissionController]
})
export class NewsAdmissionModule {}
