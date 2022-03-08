import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Faculty } from './faculty.model';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectModel('Faculty') private readonly facultyModel: Model<Faculty>,
  ) {}

  async getFaculties() {
    const faculties = await this.facultyModel.find({});
        
    return faculties as Faculty[];
  }
}