import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddAdmissionProcessDto } from './dto/add-admission-process.dto';
import { UpdateAdmissionProcessDto } from './dto/update-admission-process.dto';
import { admissionProcess } from './admissionProcess.entity';

@Injectable()
export class AdmissionProcessService {
  constructor(
    @InjectRepository(admissionProcess)
    private readonly admissionProcessRepo: Repository<admissionProcess>,
  ) {}

  async insertAdmissionProcess(addAdmissionProcessDto: AddAdmissionProcessDto): Promise<admissionProcess> {
    const { title, content, step } = addAdmissionProcessDto;

    const admissionProcess = await this.admissionProcessRepo.create({
      apTitle: title,
      apContent: content,
      apStep: parseInt(step)
    })

    const result = await this.admissionProcessRepo.save(admissionProcess);

    return result;
  }

  async getAdmissionProcess(): Promise<admissionProcess []> {
    const admissionProcess = await this.admissionProcessRepo.find({});
    return admissionProcess;
  }

  async deleteAdmissionProcess(admissionProcessId: string): Promise<void> {
    try {
      await this.admissionProcessRepo.delete({ apId: parseInt(admissionProcessId) })
    } catch (err) {
      throw new NotFoundException('Could not delete admission process.', err);
    }
  }

  async getSingleAdmissionProcess(admissionProcessId: string): Promise<admissionProcess> {
    const admissionProcess = await this.findAdmissionProcess(admissionProcessId);
    return admissionProcess;
  }

  async updateAdmissionProcess(id: string, updateAdmissionProcessDto: UpdateAdmissionProcessDto): Promise<admissionProcess> {

    const { title, content, step } = updateAdmissionProcessDto;

    const admissionProcess = await this.findAdmissionProcess(id);

    admissionProcess.apTitle = title;
    admissionProcess.apContent = content;
    admissionProcess.apStep = parseInt(step);

    await this.admissionProcessRepo.update({apId: parseInt(id)}, admissionProcess);
  
    return admissionProcess;
  }

  private async findAdmissionProcess(id: string): Promise<admissionProcess> {
    let admissionProcess;

    try {
      admissionProcess = await this.admissionProcessRepo.findOne({ apId: parseInt(id) });
    } catch (error) {
      throw new NotFoundException('Could not find admission process.');
    }

    if (!admissionProcess) {
      throw new NotFoundException('Could not find admission process.');
    }

    return admissionProcess;
  }
}
