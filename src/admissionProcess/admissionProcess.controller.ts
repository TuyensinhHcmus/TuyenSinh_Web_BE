import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AddAdmissionProcessDto } from './dto/add-admission-process.dto';
import { UpdateAdmissionProcessDto } from './dto/update-admission-process.dto';
import { AdmissionProcessService } from './admissionProcess.service';
import { admissionProcess } from './admissionProcess.entity';

@Controller('admission-process')
export class AdmissionProcessController {
  constructor(private readonly admissionProcessService: AdmissionProcessService) {}

  // [GET] /admission-process
  @Get()
  async getAllAdmissionProcess(): Promise<admissionProcess[]> {
    const admissionProcess = await this.admissionProcessService.getAdmissionProcess();
    return admissionProcess;
  }

  // [POST] /admission-process
  @Post()
  async addAdmissionProcess(@Body() addAdmissionProcessDto: AddAdmissionProcessDto): Promise<admissionProcess> {
    return await this.admissionProcessService.insertAdmissionProcess(addAdmissionProcessDto);
  }

  // [DELETE] /admission-process/:id
  @Delete(':id')
  async removeAdmissionProcess(@Param('id') admissionProcessId: string): Promise<void> {
    return await this.admissionProcessService.deleteAdmissionProcess(admissionProcessId);
  }

  // [GET] /admission-process/:id
  @Get(':id')
  async getAdmissionProcess(@Param('id') admissionProcessId: string): Promise<admissionProcess> {
    const admissionProcess = await this.admissionProcessService.getSingleAdmissionProcess(admissionProcessId);
    return admissionProcess;
  }

  // [PATCH] /admission-process/:id
  @Patch(':id')
  async updateAdmissionProcess(
    @Param('id') id: string,
    @Body() updateAdmissionProcessDto: UpdateAdmissionProcessDto,
  ): Promise<admissionProcess> {
    return await this.admissionProcessService.updateAdmissionProcess(id, updateAdmissionProcessDto);
  }
}
