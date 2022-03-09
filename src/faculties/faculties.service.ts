import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Faculty } from './faculty.model';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectModel('Faculty') private readonly facultyModel: Model<Faculty>,
  ) {}

  async insertFaculty(
    facultyName: string,
    facultyIntroduction: string,
    facultyImageCompare: string,
    facultyImageHighlight: string,
  ) {
    const newFaculty = new this.facultyModel({
      facultyName,
      facultyIntroduction,
      facultyImageCompare,
      facultyImageHighlight,
    });

    const result = await newFaculty.save();
    return result as Faculty;
  }

  async getFaculties() {
    const faculties = await this.facultyModel.find({});

    return faculties as Faculty[];
  }

  async deleteFaculty(facultyId: string) {
    try {
      await this.facultyModel.deleteOne({ _id: facultyId }).exec();
    } catch (err) {
      throw new NotFoundException('Could not delete faculty.', err);
    }
  }

  async getSingleFaculty(facultyId: string) {
    try {
      const faculty = await this.findFaculty(facultyId);
      return faculty as Faculty;
    } catch (err) {
      throw new NotFoundException('Could not find faculty.', err);
    }
  }

  async updateFaculty(
    facultyId: string,
    facultyName: string,
    facultyIntroduction: string,
    facultyImageCompare: string,
    facultyImageHighlight: string,
  ) {
    const facultyUpdate = {
      facultyName,
      facultyIntroduction,
      facultyImageCompare,
      facultyImageHighlight,
    };

    await this.facultyModel.updateOne({ _id: facultyId }, facultyUpdate);
  }

  private async findFaculty(id: string): Promise<Faculty> {
    let faculty;

    try {
      faculty = await this.facultyModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find faculty.');
    }

    if (!faculty) {
      throw new NotFoundException('Could not find faculty.');
    }
    return faculty;
  }
}
