import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddFacultyDto } from './dto/add-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

import { Faculty } from './faculty.model';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectModel('Faculty') private readonly facultyModel: Model<Faculty>,
  ) {}

  async insertFaculty(addFacultyDto: AddFacultyDto): Promise<Faculty> {
    const { name, introduction, imageCompare, imageHighlight } = addFacultyDto;

    const faculty = new this.facultyModel({
      facultyName: name,
      facultyIntroduction: introduction,
      facultyImageCompare: imageCompare,
      facultyImageHighlight: imageHighlight,
    });

    const result = await faculty.save();
    return result;
  }

  async getFaculties(): Promise<Faculty[]> {
    const faculties = await this.facultyModel.find({});

    return faculties;
  }

  async deleteFaculty(facultyId: string): Promise<void> {
    try {
      await this.facultyModel.deleteOne({ _id: facultyId }).exec();
    } catch (err) {
      throw new NotFoundException('Could not delete faculty.', err);
    }
  }

  async getSingleFaculty(facultyId: string): Promise<Faculty> {
    try {
      const faculty = await this.findFaculty(facultyId);
      return faculty;
    } catch (err) {
      throw new NotFoundException('Could not find faculty.', err);
    }
  }

  async updateFaculty(id: string, updateFacultyDto: UpdateFacultyDto): Promise<Faculty> {

    const { name, introduction, imageCompare, imageHighlight } = updateFacultyDto;

    const faculty = await this.findFaculty(id);

    faculty.facultyName = name;
    faculty.facultyIntroduction = introduction;
    faculty.facultyImageCompare = imageCompare;
    faculty.facultyImageHighlight = imageHighlight;
    
    faculty.save();
    
    return faculty;
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
