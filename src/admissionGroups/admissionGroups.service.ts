import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdmissionsGroup } from './admissionGroup.entity';



@Injectable()
export class AdmissionGroupsService {
  constructor(
    @InjectRepository(AdmissionsGroup)
    private readonly admissionGroupRepo: Repository<AdmissionsGroup>,

  ) {}

  async getAdmissionGroups(): Promise<AdmissionsGroup[]> {
    const admissionGroups = await this.admissionGroupRepo.find({});
      
    return admissionGroups;
  }

  async getSingleAdmissionGroup(admissionGroupId: string ): Promise<AdmissionsGroup> {
    let admissionGroup;
  
    try {
      admissionGroup = await this.admissionGroupRepo.findOne({admissionsGroupId:admissionGroupId});     
    } catch(err) {
      throw new NotFoundException('Could not find admission group');
    }

    if (!admissionGroup) {
      throw new NotFoundException('Could not find admission group');
    }

    return admissionGroup;
  }
}