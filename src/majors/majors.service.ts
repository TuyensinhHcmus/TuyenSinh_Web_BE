import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddMajorDto } from './dto/add-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';
import { major } from './major.entity';

@Injectable()
export class MajorsService {
  constructor(
    @InjectRepository(major)
    private readonly majorRepo: Repository<major>,
  ) { }

  async insertMajor(addMajorDto: AddMajorDto): Promise<major> {
    const {
      majorId,
      facultyId,
      name,
      introduction,
      imageName,
      target,
      typeProgram,
      majorVideo,
      majorTuition,
      majorAdmissionsInfo
    } = addMajorDto;

    const major = await this.majorRepo.create({
      majorId: majorId,
      majorFaculty: parseInt(facultyId),
      majorName: name,
      majorIntroduction: introduction,
      majorImageName: imageName,
      majorTarget: parseInt(target),
      majorTypeProgram: typeProgram,
      majorVideo: majorVideo,
      majorTuition,
      majorAdmissionsInfo
    });

    const result = await this.majorRepo.save(major);

    return result;
  }

  async getMajors(): Promise<major[]> {
    const majors = await this.majorRepo.find({});

    return majors;
  }

  async deleteMajor(majorId: string): Promise<void> {
    try {
      await this.majorRepo.delete({ majorId: majorId });
    } catch (err) {
      throw new NotFoundException('Could not delete major.', err);
    }
  }

  async getSingleMajor(majorId: string): Promise<major> {
    const major = await this.findMajor(majorId);
    return major;
  }

  async updateMajor(id: string, updateMajorDto: UpdateMajorDto): Promise<major> {

    const {
      majorId,
      facultyId,
      name,
      introduction,
      imageName,
      target,
      typeProgram,
      majorVideo,
      majorTuition,
      majorAdmissionsInfo
    } = updateMajorDto;

    await this.majorRepo.update({ majorId: id }, {
      majorId: majorId,
      majorFaculty: parseInt(facultyId),
      majorName: name,
      majorIntroduction: introduction,
      majorImageName: imageName,
      majorTarget: parseInt(target),
      majorTypeProgram: typeProgram,
      majorVideo: majorVideo,
      majorTuition: majorTuition,
      majorAdmissionsInfo: majorAdmissionsInfo
    });

    return await this.findMajor(majorId);
  }

  private async findMajor(id: string): Promise<major> {
    let major;

    try {
      major = await this.majorRepo.findOne({majorId: id});
    } catch (error) {
      throw new NotFoundException('Could not find major.');
    }

    if (!major) {
      throw new NotFoundException('Could not find major.');
    }

    return major;
  }
}
