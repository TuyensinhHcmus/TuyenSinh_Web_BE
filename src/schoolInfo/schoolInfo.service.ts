import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolInforDto } from './dto/schoolInfor.dto';

import { schoolinfo } from './schoolInfo.entity';




@Injectable()
export class SchoolInfoService {
    constructor(
        @InjectRepository(schoolinfo) 
        private readonly schoolinfoRepo: Repository<schoolinfo>,
      ) {}
    
      async getListSchoolInfo(): Promise<schoolinfo[]> {
        const listSchoolInfo = await this.schoolinfoRepo.find({});
        return listSchoolInfo;
      }

      async updateSchoolInfo(id: number, {schoolinforId, ...order}: SchoolInforDto) {
        let result = await this.schoolinfoRepo.update({schoolinforId: id}, order)
      }
}
