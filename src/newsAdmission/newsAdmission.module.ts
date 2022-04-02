import { Module } from '@nestjs/common';
import { NewsAdmissionService } from './newsAdmission.service';
import { NewsAdmissionController } from './newsAdmission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from './newsAdmission.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'NewsAdmission', schema: NewsSchema }]),
  ],
  providers: [NewsAdmissionService],
  controllers: [NewsAdmissionController]
})
export class NewsAdmissionModule {}
