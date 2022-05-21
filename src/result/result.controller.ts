import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

// import { AddResQuestionDto } from './dto/addResQuestions.dto';
// import { qna } from './result.entity';
import { ResultService } from './result.service';

@Controller('result')
export class ResultController {
    constructor(private readonly resultService: ResultService) {}

    @Get('/:id')
    async getResult(@Param('id') id: string): Promise<any> {
      return this.resultService.getResult(id)
    }

}
