import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query
} from '@nestjs/common';

import { AddAdmissionsResultDto } from './dto/add-admissionsResult.dto';
import { AdmissionsResultService } from './admissionsResult.service';

@Controller('admissions-result')
export class AdmissionsResultController {
  constructor(private readonly admissionsResultService: AdmissionsResultService) {}
  
  // [POST] /import-excel
  @Post('/import-excel')
  async importDataExcel(@Body() addAdmissionsResultDto: AddAdmissionsResultDto): Promise<any> {
    await this.admissionsResultService.importDataExcel(addAdmissionsResultDto);
    return [];
  }

  // [GET] /
  @Get()
  async getAllBenchmarksByYear(
    @Query('numberPhone') numberPhone: string
  ): Promise<any> {
    const result = await this.admissionsResultService.searchAdmissionsResult(numberPhone);
    return result;
  }
}
