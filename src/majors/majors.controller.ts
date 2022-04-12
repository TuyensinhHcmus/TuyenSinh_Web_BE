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
import { major } from './major.entity';

@Controller('majors')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  // [GET] /majors
  @Get()
  async getAllMajors(): Promise<major[]> {
    const majors = await this.majorsService.getMajors();
    return majors;
  }

  // [POST] /majors
  @Post()
  async addMajor(@Body() addMajorDto: AddMajorDto): Promise<major> {
    return await this.majorsService.insertMajor(addMajorDto);
  }

  // [DELETE] /majors/:id
  @Delete(':id')
  async removeMajor(@Param('id') majorId: string): Promise<void> {
    return await this.majorsService.deleteMajor(majorId);
  }

  // [GET] /majors/:id
  @Get(':id')
  async getMajor(@Param('id') majorId: string): Promise<major> {
    const major = await this.majorsService.getSingleMajor(majorId);
    return major;
  }

  // [PATCH] /majors/:id
  @Patch(':id')
  async updateMajor(
    @Param('id') idMajor: string,
    @Body() updateMajorDto: UpdateMajorDto,
  ): Promise<major> {
    return await this.majorsService.updateMajor(idMajor, updateMajorDto);
  }
}
