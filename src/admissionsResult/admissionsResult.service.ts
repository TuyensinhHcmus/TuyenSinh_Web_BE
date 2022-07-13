import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { AddAdmissionsResultDto } from './dto/add-admissionsResult.dto'
import { AdmissionsResult } from './admissionsResult.entity'

@Injectable()
export class AdmissionsResultService {
  constructor(
    @InjectRepository(AdmissionsResult) 
    private readonly admissionsResultRepo: Repository<AdmissionsResult>,
  ) {}

  async importDataExcel(addAdmissionsResultDto: AddAdmissionsResultDto): Promise<any> {
    const { dataImport } = addAdmissionsResultDto;

    try {

      const results = await this.admissionsResultRepo.find({});
  
      await this.admissionsResultRepo.remove(results);

      const data = this.admissionsResultRepo.create(dataImport);
      const result = await this.admissionsResultRepo.save(data);
      return result;
    } catch(err) {
      throw new HttpException('Can not import data', 400);
    }
  }

  async searchAdmissionsResult(numberPhone: string): Promise<AdmissionsResult> {

    let result;

    try {
      result = await this.admissionsResultRepo.findOne({ adrsPhone: numberPhone });
    } catch (error) {
      throw new NotFoundException('Could not find result.');
    }

    if (!result) {
      throw new NotFoundException('Could not find result.');
    }

    return result;
  }

}
