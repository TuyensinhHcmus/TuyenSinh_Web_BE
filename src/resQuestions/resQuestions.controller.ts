import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { AddResQuestionDto } from './dto/addResQuestions.dto';
import { qna } from './resQuestions.entity';
import { ResQuestionsService } from './resQuestions.service';

@Controller('res-question')
export class ResQuestionsController {
    constructor(private readonly resQuestionService: ResQuestionsService) {}

    @Post('/add')
    async addResQuestion(@Body() addResQuestionDto: AddResQuestionDto): Promise<qna> {
      return await this.resQuestionService.insertResQuestion(addResQuestionDto);
    }

    @Post('/update')
    async updateResQuestion(
      @Body('qnaQuestion') qnaQuestion: string, 
      @Body('qnaAnswer') qnaAnswer: string, 
      @Body('qnaId') qnaId: number,
      @Body('qnaTypeOfTrainingID') qnaTypeOfTrainingID: string,

      ): Promise<any> 
    {
      return await this.resQuestionService.updateResQuestion(qnaId, qnaQuestion, qnaAnswer, qnaTypeOfTrainingID);
    }

    @Get('getlist')
    async getListResQuestion(@Param('localeCode') localeCode: string): Promise<qna[]> {
      return await this.resQuestionService.getListResQuestion(localeCode);
    }

    @Get('getqnabyid')
    async getOneResQuestion(@Query('qnaId') qnaid: number): Promise<qna> {
      return await this.resQuestionService.getResQuestionById(qnaid);
    }

    @Post('delete')
    async deleteResQuestion(@Body('qnaId') qnaId: number): Promise<any> {
      return await this.resQuestionService.deleteResQuestion(qnaId);
    }

    @Get('getQnaByTypeOfTraining')
    async getQnaByTypeOfTraining(
      @Query('TypeOfTraining') typeOfTraining: string): Promise<qna[]> {
      console.log(typeOfTraining);
      return await this.resQuestionService.getQnaByTypeOfTraining(typeOfTraining);
    }

}
