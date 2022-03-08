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
        
    return faculties.map(faculty => ({
        id: faculty._id,
        facultyName: faculty.facultyName, 
        facultyIntroduction: faculty.facultyIntroduction,  
        facultyImageCompare: faculty.facultyImageCompare,
        facultyImageHighlight: faculty.facultyImageHighlight,
    }));
  }
}