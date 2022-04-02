import { Module } from '@nestjs/common';
import { ResQuestionsService } from './resQuestions.service';
import { ResQuestionsController } from './resQuestions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ResQuestionsSchema } from './resQuestions.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ResQuestion', schema: ResQuestionsSchema }]),
  ],
  providers: [ResQuestionsService],
  controllers: [ResQuestionsController]
})
export class ResQuestionsModule {}
