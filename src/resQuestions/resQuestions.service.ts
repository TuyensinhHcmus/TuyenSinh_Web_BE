import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { qna } from './resQuestions.entity';
import { AddResQuestionDto } from './dto/addResQuestions.dto';


@Injectable()
export class ResQuestionsService {
  constructor(
    @InjectRepository(qna)
    private readonly qnaRepo: Repository<qna>
  ) { }

  async insertResQuestion(addResQuestionDto: AddResQuestionDto): Promise<qna> {
    const { qnaCreator, qnaDateCreate, qnaQuestion, qnaAnswer, qnaTypeOfTrainingID } = addResQuestionDto;

    let resquestion = this.qnaRepo.create({
      qnaCreator,
      qnaDateCreate,
      qnaAnswer,
      qnaQuestion,
      qnaTypeOfTrainingID
    });

    const result = await this.qnaRepo.save(resquestion);
    return result;


    // const { trans, qnaAnswerImage, qnaQuestionImage } = addResQuestionDto;

    // const qnaDateCreate = new Date();
    // let qnaCreator = '17eee754-b253-4094-90b2-c6248714d3f2'

    // let res;

    // try {
    //   let qnaAddition = {
    //     qna_trans: trans,  
    //     qnaDateCreate: qnaDateCreate,
    //     qnaCreator: qnaCreator,
    //     qnaAnswerImage: qnaAnswerImage,
    //     qnaQuestionImage: qnaQuestionImage
    //   }

    //   res = await this.qnaRepo.save(qnaAddition)
    // } catch (err) {
    //   throw new Error("Save failure")
    // }

    // return res;
  }
  // async insertResQuestion(addResQuestionDto: AddResQuestionDto): Promise<qna> {
  //   const { trans, qnaAnswerImage, qnaQuestionImage } = addResQuestionDto;

  //   const qnaDateCreate = new Date();
  //   let qnaCreator = '17eee754-b253-4094-90b2-c6248714d3f2'

  //   let res;

  //   try {
  //     const newQna = this.qnaRepo.create({
  //       qnaDateCreate: qnaDateCreate,
  //       qnaCreator: qnaCreator,
  //       qnaAnswerImage: qnaAnswerImage,
  //       qnaQuestionImage: qnaAnswerImage
  //     });

  //     res = await this.qnaRepo.save(newQna)
  //   } catch (err) {
  //     throw new Error("Save failure")
  //   }

  //   try {
  //     let listQnaTrans = [...trans.map( i=> ({
  //       qnaQuestion: i.qnaQuestion,
  //       qnaAnswer: i.qnaAnswer,
  //       qnaId: res.qnaId
  //     }))]
  
  //     let listQnaTransObj = this.qnaTransRepo.create(listQnaTrans)

  //     let result = await this.qnaTransRepo.save(listQnaTransObj);

  //   } catch (err) {
  //     await this.qnaTransRepo.delete({qnaId: res.qnaId})
  //     throw new Error("Save failure")
  //   }

  //   return res;
  // }

  // async getListResQuestion(localeCode: string): Promise<qna[]> {
  //   // const listNews = await this.newsModel.find({});
  //   const listResQuestion = await this.qnaRepo.find({});

  //   return listResQuestion;
  // }
  async getListResQuestion(localeCode: string): Promise<qna[]> {
    const listResQuestion = await this.qnaRepo.find({})
    return listResQuestion;
    // const res = await this.qnaRepo.find({
    //   relations:["qna_trans"]
    // })
    // return res
  }

  async getQnaByTypeOfTraining(typeOfTraining: string): Promise<qna[]> {
    const listResQuestion = await this.qnaRepo.find({qnaTypeOfTrainingID: typeOfTraining})
    return listResQuestion;
  }
}
