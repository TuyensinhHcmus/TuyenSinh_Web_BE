import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddResQuestionDto } from './dto/add-res-questions.dto';
import { ResQuestion } from './res-questions.model';
import { ResQuestionsService } from './res-questions.service';

@Controller('res-question')
export class ResQuestionsController {
    constructor(private readonly resQuestionService: ResQuestionsService) {}

    @Post()
    async addResQuestion(@Body() addResQuestionDto: AddResQuestionDto): Promise<ResQuestion> {
      return await this.resQuestionService.insertResQuestion(addResQuestionDto);
    }

    @Get('getlist')
    async getListResQuestion(): Promise<ResQuestion[]> {
      return await this.resQuestionService.getListResQuestion();
    }

}
