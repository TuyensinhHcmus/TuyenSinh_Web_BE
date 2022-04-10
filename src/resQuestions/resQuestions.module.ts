import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResQuestionsService } from './resQuestions.service';
import { ResQuestionsController } from './resQuestions.controller';
import {  qna, qna_trans } from './resQuestions.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([qna, qna_trans]),
  ],
  providers: [ResQuestionsService],
  controllers: [ResQuestionsController]
})
export class ResQuestionsModule {}
