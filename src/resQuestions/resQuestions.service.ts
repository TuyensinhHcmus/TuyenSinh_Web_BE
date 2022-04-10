import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { qna, qna_trans } from './resQuestions.entity';
import { AddResQuestionDto } from './dto/addResQuestions.dto';


@Injectable()
export class ResQuestionsService {
  constructor(
    @InjectRepository(qna)
    private readonly qnaRepo: Repository<qna>,
    
    @InjectRepository(qna_trans)
    private readonly qnaTransRepo: Repository<qna_trans>,
  ) { }

  async insertResQuestion(addResQuestionDto: AddResQuestionDto): Promise<qna> {
    const { trans } = addResQuestionDto;

    const qnaDateCreate = new Date();
    // let qnaCreator = '17eee754-b253-4094-90b2-c6248714d3f2'
    let qnaCreator = 0

    let res;

    try {
      const newQna = this.qnaRepo.create({
        qnaDateCreate: qnaDateCreate,
        qnaCreator: qnaCreator
      });

      res = await this.qnaRepo.save(newQna)
    } catch (err) {
      throw new Error("Save failure")
    }

    try {
      let listQnaTrans = [...trans.map( i=> ({
        qnaQuestion: i.qnaQuestion,
        qnaAnswer: i.qnaAnswer,
        qnaId: res.qnaId
      }))]
  
      let listQnaTransObj = this.qnaTransRepo.create(listQnaTrans)

      let result = await this.qnaTransRepo.save(listQnaTransObj);

    } catch (err) {
      // await this.qnaTransRepo.delete({qnaId: res.qnaId})
      throw new Error("Save failure")
    }

    return res;
  }

  async getListResQuestion(): Promise<qna[]> {
    // const listNews = await this.newsModel.find({});
    const listResQuestion = await this.qnaRepo.find({});

    return listResQuestion;
  }
}
