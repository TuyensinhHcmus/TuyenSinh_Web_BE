import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResQuestion } from './res-questions.model';
import { AddResQuestionDto } from './dto/add-res-questions.dto';

@Injectable()
export class ResQuestionsService {
    constructor(
        @InjectModel('ResQuestion') private readonly newsModel: Model<ResQuestion>,
      ) {}
    
      async insertResQuestion(addResQuestionDto: AddResQuestionDto): Promise<ResQuestion> {
        const { question, answer } = addResQuestionDto;
    
        const resQuestion = new this.newsModel({
          question: question,
          answer: answer,
        });
    
        const result = await resQuestion.save();
        return result;
      }

      async getListResQuestion(): Promise<ResQuestion[]> {
        // const listNews = await this.newsModel.find({});
        const listResQuestion = await this.newsModel.find({});
    
        return listResQuestion;
      }
}
