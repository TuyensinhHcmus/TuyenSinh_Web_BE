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
import { faculty } from './faculty.entity';
@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  // [GET] /faculties
  @Get()
  async getAllFaculties(): Promise<faculty[]> {
    const faculties = await this.facultiesService.getFaculties();
    return faculties;
  }

  // [POST] /faculties
  @Post()
  async addFaculty(@Body() addFacultyDto: AddFacultyDto): Promise<faculty> {
    return await this.facultiesService.insertFaculty(addFacultyDto);
  }

  // [DELETE] /faculties/:id
  @Delete(':id')
  async removeFaculty(@Param('id') facultyId: string): Promise<void> {
    return await this.facultiesService.deleteFaculty(facultyId);
  }

  // [GET] /faculties/:id
  @Get(':id')
  async getFaculty(@Param('id') facultyId: string): Promise<faculty> {
    const faculty = await this.facultiesService.getSingleFaculty(facultyId);
    return faculty;
  }

  // [PATCH] /faculties/:id
  @Patch(':id')
  async updateFaculty(
    @Param('id') id: string,
    @Body() updateFacultyDto: UpdateFacultyDto,
  ): Promise<faculty> {
    return await this.facultiesService.updateFaculty(id, updateFacultyDto);
  }
}
