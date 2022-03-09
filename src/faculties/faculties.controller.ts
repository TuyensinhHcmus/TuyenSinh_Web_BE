import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { FacultiesService } from './faculties.service';

@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  // [GET] /faculties
  @Get()
  async getAllFaculties() {
    const faculties = await this.facultiesService.getFaculties();
    return faculties;
  }

  // [POST] /faculties
  @Post()
  async addFaculty(
    @Body('name') facultyName: string,
    @Body('introduction') facultyIntroduction: string,
    @Body('imageCompare') facultyImageCompare: string,
    @Body('imageHighlight') facultyImageHighlight: string
  ) {
    const faculty = await this.facultiesService.insertFaculty(
      facultyName,
      facultyIntroduction,
      facultyImageCompare,
      facultyImageHighlight
    )

    return faculty;
  }

  // [DELETE] /faculties/:id
  @Delete(':id')
  async removeFaculty(@Param('id') facultyId: string) {
    await this.facultiesService.deleteFaculty(facultyId);

    return null;
  }

  // [GET] /faculties/:id
  @Get(':id')
  async getFaculty(@Param('id') facultyId: string) {
    const faculty = await this.facultiesService.getSingleFaculty(facultyId);
    return faculty;
  }

  // [PATCH] /faculties/:id
  @Patch(':id')
  async updateFaculty(
    @Param('id') facultyId: string,
    @Body('name') facultyName: string,
    @Body('introduction') facultyIntroduction: string,
    @Body('imageCompare') facultyImageCompare: string,
    @Body('imageHighlight') facultyImageHighlight: string
  ) {
    await this.facultiesService.updateFaculty(
      facultyId,
      facultyName,
      facultyIntroduction,
      facultyImageCompare,
      facultyImageHighlight
    )
  }
}
