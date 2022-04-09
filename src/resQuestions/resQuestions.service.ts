import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { qna } from './resQuestions.entity';
import { AddResQuestionDto } from './dto/addResQuestions.dto';


@Injectable()
export class ResQuestionsService {
    constructor(
        @InjectRepository(qna) 
        private readonly qnaRepo: Repository<qna>,
      ) {}
    
      // async insertResQuestion(addResQuestionDto: AddResQuestionDto): Promise<qna> {
      //   const { question, answer } = addResQuestionDto;
    
      //   const resQuestion = new this.newsModel({
      //     question: question,
      //     answer: answer,
      //   });
    
      //   const result = await resQuestion.save();
      //   return result;
      // }

      async getListResQuestion(): Promise<qna[]> {
        // const listNews = await this.newsModel.find({});
        const listResQuestion = await this.qnaRepo.find({});
    
        return listResQuestion;
      }
}
