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
import { tuition } from './tuition.entity';

@Controller('tuitions')
export class TuitionsController {
  constructor(private readonly tuitionsService: TuitionsService) {}

  // [GET] /tuitions
  @Get()
  async getAllTuitions(): Promise<tuition[]> {
    const tuitions = await this.tuitionsService.getTuitions();
    return tuitions;
  }

  // [PATCH] /tuitions/:id
  @Patch(':id')
  async updateTuition(
    @Param('id') id: string,
    @Body() updateTuitionDto: UpdateTuitionDto,
  ): Promise<tuition> {
    return await this.tuitionsService.updateTuition(id, updateTuitionDto);
  }
}
