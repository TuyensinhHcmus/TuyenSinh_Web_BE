import { Module } from '@nestjs/common';
import { ResQuestionsService } from './res-questions.service';
import { ResQuestionsController } from './res-questions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ResQuestionsSchema } from './res-questions.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ResQuestion', schema: ResQuestionsSchema }]),
  ],
  providers: [ResQuestionsService],
  controllers: [ResQuestionsController]
})
export class ResQuestionsModule {}
