import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { major } from 'src/majors/major.entity';
import { Repository } from 'typeorm';

import { AddFacultyDto } from './dto/add-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { faculty } from './faculty.entity';
@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(faculty)
    private readonly facultiesRepo: Repository<faculty>,

    @InjectRepository(major)
    private readonly majorsRepo: Repository<major>,

  ) { }

  async insertFaculty(addFacultyDto: AddFacultyDto): Promise<faculty> {
    const { name, introduction, imageCompare, imageHighlight ,logo } = addFacultyDto;

    const faculty = await this.facultiesRepo.create({
      facultyName: name,
      facultyIntroduction: introduction,
      facultyImageCompare: imageCompare,
      facultyImageHighlight: imageHighlight,
      facultyLogo: logo
    })

    const result = await this.facultiesRepo.save(faculty);

    return result;
  }

  async getFaculties(): Promise<faculty[]> {
    let faculties = await this.facultiesRepo.find({});
    const listMajors = await this.majorsRepo.find({});

    // console.log('listMajors', listMajors, typeof listMajors[0].majorFaculty);
    // console.log('faculties', faculties, typeof faculties[0].facultyId);


    faculties = faculties.map(fac => {
      let majors = listMajors.filter(mj => mj.majorFaculty === fac.facultyId).map(({ majorId, majorName }) => ({ majorId, majorName }));
      return { ...fac, majors }
    })

    return faculties;
  }

  async deleteFaculty(facultyId: string): Promise<void> {
    try {
      await this.facultiesRepo.delete({ facultyId: parseInt(facultyId) })
    } catch (err) {
      throw new NotFoundException('Could not delete faculty.', err);
    }
  }

  async getSingleFaculty(facultyId: string): Promise<faculty> {
    const faculty = await this.findFaculty(facultyId);
    return faculty;
  }

  async updateFaculty(id: string, updateFacultyDto: UpdateFacultyDto): Promise<faculty> {

    const { name, introduction, imageCompare, imageHighlight, logo } = updateFacultyDto;

    const faculty = await this.findFaculty(id);

    faculty.facultyName = name;
    faculty.facultyIntroduction = introduction;
    faculty.facultyImageCompare = imageCompare;
    faculty.facultyImageHighlight = imageHighlight;
    faculty.facultyLogo = logo;

    await this.facultiesRepo.update({ facultyId: parseInt(id) }, faculty);
    //await this.facultiesRepo.save(faculty);
    //console.log(result)
    return faculty;
  }

  private async findFaculty(id: string): Promise<faculty> {
    let faculty;

    try {
      faculty = await this.facultiesRepo.findOne({ facultyId: parseInt(id) });
    } catch (error) {
      throw new NotFoundException('Could not find faculty.');
    }

    if (!faculty) {
      throw new NotFoundException('Could not find faculty.');
    }

    return faculty;
  }
}
