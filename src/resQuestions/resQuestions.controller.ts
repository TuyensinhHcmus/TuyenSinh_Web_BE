import { Body, Controller, Get, Post } from '@nestjs/common';

import { AddResQuestionDto } from './dto/addResQuestions.dto';
import { qna } from './resQuestions.entity';
import { ResQuestionsService } from './resQuestions.service';

@Controller('res-question')
export class ResQuestionsController {
    constructor(private readonly resQuestionService: ResQuestionsService) {}

    // @Post()
    // async addResQuestion(@Body() addResQuestionDto: AddResQuestionDto): Promise<qna> {
    //   return await this.resQuestionService.insertResQuestion(addResQuestionDto);
    // }

    @Get('getlist')
    async getListResQuestion(): Promise<qna[]> {
      return await this.resQuestionService.getListResQuestion();
    }

}
