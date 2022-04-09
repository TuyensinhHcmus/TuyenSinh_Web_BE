import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddFacultyDto } from './dto/add-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { faculty } from './faculty.entity';
@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(faculty)
    private readonly facultiesRepo: Repository<faculty>,
  ) {}

  async insertFaculty(addFacultyDto: AddFacultyDto): Promise<faculty> {
    const { name, introduction, imageCompare, imageHighlight } = addFacultyDto;

    const faculty = await this.facultiesRepo.create({
      facultyName: name,
      facultyIntroduction: introduction,
      facultyImageCompare: imageCompare,
      facultyImageHighlight: imageHighlight,
    })

    const result = await this.facultiesRepo.save(faculty);

    return result;
  }

  async getFaculties(): Promise<faculty []> {
    const faculties = await this.facultiesRepo.find({});
    return faculties;
  }

  async deleteFaculty(facultyId: string): Promise<void> {
    try {
      await this.facultiesRepo.delete({facultyId: parseInt(facultyId)})
    } catch (err) {
      throw new NotFoundException('Could not delete faculty.', err);
    }
  }

  async getSingleFaculty(facultyId: string): Promise<faculty> {
    const faculty = await this.findFaculty(facultyId);
    return faculty;
  }

  async updateFaculty(id: string, updateFacultyDto: UpdateFacultyDto): Promise<faculty> {

    const { name, introduction, imageCompare, imageHighlight } = updateFacultyDto;

    const faculty = await this.findFaculty(id);

    faculty.facultyName = name;
    faculty.facultyIntroduction = introduction;
    faculty.facultyImageCompare = imageCompare;
    faculty.facultyImageHighlight = imageHighlight;
    
    await this.facultiesRepo.update({facultyId: parseInt(id)},faculty);
    //await this.facultiesRepo.save(faculty);
    //console.log(result)
    return faculty;
  }

  private async findFaculty(id: string): Promise<faculty> {
    let faculty;

    try {
      faculty = await this.facultiesRepo.findOne({facultyId: parseInt(id)});
    } catch (error) {
      throw new NotFoundException('Could not find faculty.');
    }

    if (!faculty) {
      throw new NotFoundException('Could not find faculty.');
    }

    return faculty;
  }
}
