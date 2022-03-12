import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AddFacultyDto } from './dto/add-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

import { FacultiesService } from './faculties.service';
import { Faculty } from './faculty.model';

@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  // [GET] /faculties
  @Get()
  async getAllFaculties(): Promise<Faculty[]> {
    const faculties = await this.facultiesService.getFaculties();
    return faculties;
  }

  // [POST] /faculties
  @Post()
  async addFaculty(@Body() addFacultyDto: AddFacultyDto): Promise<Faculty> {
    return await this.facultiesService.insertFaculty(addFacultyDto);
  }

  // [DELETE] /faculties/:id
  @Delete(':id')
  async removeFaculty(@Param('id') facultyId: string): Promise<void> {
    return await this.facultiesService.deleteFaculty(facultyId);
  }

  // [GET] /faculties/:id
  @Get(':id')
  async getFaculty(@Param('id') facultyId: string): Promise<Faculty> {
    const faculty = await this.facultiesService.getSingleFaculty(facultyId);
    return faculty;
  }

  // [PATCH] /faculties/:id
  @Patch(':id')
  async updateFaculty(
    @Param('id') id: string,
    @Body() updateFacultyDto: UpdateFacultyDto,
  ): Promise<Faculty> {
    return await this.facultiesService.updateFaculty(id, updateFacultyDto);
  }
}
