import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { AddMajorDto } from './dto/add-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';

import { MajorsService } from './majors.service';
import { Major } from './major.model';

@Controller('majors')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  // [GET] /majors
  @Get()
  async getAllMajors(): Promise<Major[]> {
    const majors = await this.majorsService.getMajors();
    return majors;
  }

  // [POST] /majors
  @Post()
  async addMajor(@Body() addMajorDto: AddMajorDto): Promise<Major> {
    return await this.majorsService.insertMajor(addMajorDto);
  }

  @Get('getListMajorsOfFaculty')
  async getListMajorsOfFaculty() : Promise<any> {
    return await this.majorsService.getListMajorsOfFaculty();
  }

  // [DELETE] /majors/:id
  @Delete(':id')
  async removeMajor(@Param('id') majorId: string): Promise<void> {
    return await this.majorsService.deleteMajor(majorId);
  }

  // [GET] /majors/:id
  @Get(':id')
  async getMajor(@Param('id') majorId: string): Promise<Major> {
    const major = await this.majorsService.getSingleMajor(majorId);
    return major;
  }

  // [PATCH] /majors/:id
  @Patch(':id')
  async updateMajor(
    @Param('id') idMajor: string,
    @Body() updateMajorDto: UpdateMajorDto,
  ): Promise<Major> {
    return await this.majorsService.updateMajor(idMajor, updateMajorDto);
  }
}
