import { Body, Controller, Get, Post } from '@nestjs/common';
import { SchoolInforDto } from './dto/schoolInfor.dto';
import { schoolinfo } from './schoolInfo.entity';

import { SchoolInfoService } from './schoolInfo.service';

@Controller('school-info')
export class SchoolInfoController {
    constructor(private readonly schoolInfoService: SchoolInfoService) {}

    @Get('getlist')
    async getSchoolInfo(): Promise<schoolinfo[]> {
      return await this.schoolInfoService.getListSchoolInfo();
    }

    @Post('update')
    async updateSchoolInfo(@Body() schoolInfor: SchoolInforDto) {
      return await this.schoolInfoService.updateSchoolInfo(schoolInfor.schoolinforId, schoolInfor);
    }

}
