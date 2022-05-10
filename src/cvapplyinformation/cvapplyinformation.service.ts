import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { cvapplyinformation } from './cvapplyinformation.entity';
import { SaveCVAIDto } from './dto/save-cvai.dto';
import { UpdateCVAIDto } from './dto/update-cvai.dto';


@Injectable()
export class CvaisService {
  constructor(
    @InjectRepository(cvapplyinformation)
    private readonly cvaisRepo: Repository<cvapplyinformation>,
  ) { }

  async saveApplyInformationCV(saveCVAIDto: SaveCVAIDto, cvaiId: number) {
    const newCVAI = await this.cvaisRepo.create(
      {
        cvaiId: cvaiId,
        ...saveCVAIDto
      });

    const result = await this.cvaisRepo.save(newCVAI);
    return result;
  }

  async updateApplyInformationCV(updateCVAIDto: UpdateCVAIDto) {

    await this.cvaisRepo.update({ cvaiId: updateCVAIDto.cvaiId }, updateCVAIDto)
  }
}