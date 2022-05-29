import { Injectable, NotFoundException } from '@nestjs/common';
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
    const { qnaCreator, qnaQuestion, qnaAnswer, qnaTypeOfTrainingID } = addResQuestionDto;

    let qnaDateCreate = new Date();

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

  async getResQuestionById(qnaId: number): Promise<qna> {
    console.log("qnaid", qnaId);
    
    const qna = await this.qnaRepo.findOne({qnaId : qnaId})
    return qna;
    // const res = await this.qnaRepo.find({
    //   relations:["qna_trans"]
    // })
    // return res
  }

  async deleteResQuestion(id : number)  {
    // console.log("id", id);
    try {
      const res = await this.qnaRepo.delete({
        qnaId: id
      })
      if(res.affected === 0)
      {
        throw new NotFoundException('Could not delete qna.');
      }
      return res
    } catch (err) {
      throw new NotFoundException('Could not delete qna.', err);
    }
   
  }

  async updateResQuestion(qnaId : number, qnaQuestion: string, qnaAnswer: string, qnaTypeOfTrainingID: string) {    
    try {
      // console.log('qnaQuestion', qnaQuestion, qnaAnswer, qnaTypeOfTrainingID);
      
      let data = {}
      if(qnaQuestion !== undefined)
      {
        data['qnaQuestion'] = qnaQuestion
      }
      if(qnaAnswer !== undefined)
      {
        data['qnaAnswer'] = qnaAnswer
      }
      if(qnaTypeOfTrainingID !== undefined)
      {
        data['qnaTypeOfTrainingID'] = qnaTypeOfTrainingID
      }

      const res = await this.qnaRepo.update({qnaId: qnaId}, data)
      if(res.affected === 0)
      {
        throw new NotFoundException('Could not update qna.');
      }
      
      return res
    } catch (err) {
      throw new NotFoundException('Could not update qna.', err);
    }
  }

  // async updateResQuestion(id: string, updateFacultyDto: UpdateFacultyDto): Promise<qna> {

  //   const { name, introduction, imageCompare, imageHighlight } = updateFacultyDto;

  //   const faculty = await this.findFaculty(id);

  //   faculty.facultyName = name;
  //   faculty.facultyIntroduction = introduction;
  //   faculty.facultyImageCompare = imageCompare;
  //   faculty.facultyImageHighlight = imageHighlight;
    
  //   await this.facultiesRepo.update({facultyId: parseInt(id)},faculty);
  //   //await this.facultiesRepo.save(faculty);
  //   //console.log(result)
  //   return faculty;
  // }

  async getQnaByTypeOfTraining(typeOfTraining: string): Promise<qna[]> {
    const listResQuestion = await this.qnaRepo.find({qnaTypeOfTrainingID: typeOfTraining})
    return listResQuestion;
  }
}
