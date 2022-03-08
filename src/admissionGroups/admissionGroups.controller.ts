import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { AdmissionGroupsService } from './admissionGroups.service';

@Controller('admission-groups')
export class AdmissionGroupsController {
  constructor(private readonly admissionGroupsService: AdmissionGroupsService) {}

  @Get()
  async getAllAdmissionGroups() {
    const admissionGroups = await this.admissionGroupsService.getAdmissionGroups();
    return admissionGroups;
  }
}
