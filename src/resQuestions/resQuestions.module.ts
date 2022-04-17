import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResQuestionsService } from './resQuestions.service';
import { ResQuestionsController } from './resQuestions.controller';
import {  qna } from './resQuestions.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([qna]),
  ],
  providers: [ResQuestionsService],
  controllers: [ResQuestionsController]
})
export class ResQuestionsModule {}
