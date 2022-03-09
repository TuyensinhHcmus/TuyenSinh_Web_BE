import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AdmissionGroup } from './admissionGroup.model';

@Injectable()
export class AdmissionGroupsService {
  constructor(
    @InjectModel('AdmissionGroup') private readonly admissionGroupModel: Model<AdmissionGroup>,
  ) {}

  async getAdmissionGroups() {
    const admissionGroups = await this.admissionGroupModel.find().exec();
      
    return admissionGroups as AdmissionGroup[];
  }

  async getSingleAdmissionGroup(admissionGroupId: string ) {
    try {
      const addmissionGroup = this.admissionGroupModel.findById(admissionGroupId).exec();
      return addmissionGroup;
    } catch(err) {
      throw new NotFoundException('Could not find addmission group');
    }
  }
}