import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';

import { AdmissionGroups } from './admissionGroups.model';

@Injectable()
export class AdmissionGroupsSerivce {
  private admissionGroups: AdmissionGroups[] = [];

  constructor(@InjectModel('AdmissionGroups')private readonly admissionGroupsModel: Model<AdmissionGroups>){}

  async getAdmissionGroups() {
    const admissionGroups = await this.admissionGroupsModel.find().exec();
    return admissionGroups as AdmissionGroups[]; 
  }
}