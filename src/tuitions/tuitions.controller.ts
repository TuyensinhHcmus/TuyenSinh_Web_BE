import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { AddTuitionDto } from './dto/add-tuition.dto';
import { UpdateTuitionDto } from './dto/update-tuition.dto';

import { TuitionsService } from './tuitions.service';
import { Tuition } from './tuition.model';

@Controller('tuitions')
export class TuitionsController {
  constructor(private readonly tuitionsService: TuitionsService) {}

  // [GET] /tuitions
  @Get()
  async getAllTuitions(): Promise<Tuition[]> {
    const tuitions = await this.tuitionsService.getTuitions();
    return tuitions;
  }

  // [POST] /tuitions
  @Post()
  async addTuition(@Body() addTuitionDto: AddTuitionDto): Promise<Tuition> {
    return await this.tuitionsService.insertTuition(addTuitionDto);
  }

  // [DELETE] /tuitions/:id
  @Delete(':id')
  async removeTuition(@Param('id') tuitionId: string): Promise<void> {
    return await this.tuitionsService.deleteTuition(tuitionId);
  }

  // [GET] /tuitions/:id
  @Get(':id')
  async getTuition(@Param('id') tuitionId: string): Promise<Tuition> {
    const tuition = await this.tuitionsService.getSingleTuition(tuitionId);
    return tuition;
  }

  // [PATCH] /tuitions/:id
  @Patch(':id')
  async updateTuition(
    @Param('id') idTuition: string,
    @Body() updateTuitionDto: UpdateTuitionDto,
  ): Promise<Tuition> {
    return await this.tuitionsService.updateTuition(idTuition, updateTuitionDto);
  }
}
