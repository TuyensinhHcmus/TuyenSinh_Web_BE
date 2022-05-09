import {Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { cvapplyinformation } from './cvapplyinformation.entity';


@Injectable()
export class CvaisService {
  constructor(
    @InjectRepository(cvapplyinformation)
    private readonly cvaisRepo: Repository<cvapplyinformation>,
  ) { }
  
  async saveApplyInformationCV(saveCVAIDto){
    const newCVAI = await this.cvaisRepo.create(saveCVAIDto);

    const result = await this.cvaisRepo.save(newCVAI);
    return result;
  }

}