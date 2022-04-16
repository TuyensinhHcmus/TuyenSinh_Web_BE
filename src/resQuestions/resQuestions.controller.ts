import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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

    @Get('getlist')
    async getListResQuestion(@Param('localeCode') localeCode: string): Promise<qna[]> {
      return await this.resQuestionService.getListResQuestion(localeCode);
    }

}
