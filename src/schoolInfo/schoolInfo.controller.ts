import { Body, Controller, Get, Post } from '@nestjs/common';
import { schoolinfo } from './schoolInfo.entity';

import { SchoolInfoService } from './schoolInfo.service';

@Controller('school-info')
export class SchoolInfoController {
    constructor(private readonly schoolInfoService: SchoolInfoService) {}

    @Get('getlist')
    async getSchoolInfo(): Promise<schoolinfo[]> {
      return await this.schoolInfoService.getListSchoolInfo();
    }

}
