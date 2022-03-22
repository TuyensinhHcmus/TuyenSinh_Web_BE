import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddMajorDto } from './dto/add-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';

import { Major } from './major.model';

@Injectable()
export class MajorsService {
  constructor(
    @InjectModel('Major') private readonly majorModel: Model<Major>,
  ) {}

  async insertMajor(addMajorDto: AddMajorDto): Promise<Major> {
    const { 
      majorId,
      facultyId, 
      name, 
      introduction, 
      imageName, 
      target, 
      admissionGroup, 
      program 
    } = addMajorDto;

    const major = new this.majorModel({
      majorId: majorId,
      majorFacultyId: facultyId,
      majorName: name,
      majorIntroduction: introduction,
      majorImageName: imageName,
      majorTarget: target,
      majorAdmissionGroup: admissionGroup,
      majorProgram: program,
    });

    const result = await major.save();
    return result;
  }

  async getMajors(): Promise<Major[]> {
    const majors = await this.majorModel.find({});

    return majors;
  }

  async deleteMajor(majorId: string): Promise<void> {
    try {
      await this.majorModel.deleteOne({ _id: majorId }).exec();
    } catch (err) {
      throw new NotFoundException('Could not delete major.', err);
    }
  }

  async getSingleMajor(majorId: string): Promise<Major> {
    const major = await this.findMajor(majorId);
    return major;
  }

  async updateMajor(id: string, updateMajorDto: UpdateMajorDto): Promise<Major> {

    const { 
      majorId,
      facultyId, 
      name, 
      introduction, 
      imageName, 
      target, 
      admissionGroup, 
      program 
    } = updateMajorDto;

    const major = await this.findMajor(id);

    Object.assign(major, {
      majorId: majorId,
      majorFacultyId: facultyId,
      majorName: name,
      majorIntroduction: introduction,
      majorImageName: imageName,
      majorTarget: target,
      majorAdmissionGroup: admissionGroup,
      majorProgram: program,
    })

    major.save();
    
    return major;
  }

  private async findMajor(id: string): Promise<Major> {
    let major;

    try {
      major = await this.majorModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find major.');
    }

    if (!major) {
      throw new NotFoundException('Could not find major.');
    }

    return major;
  }
}
