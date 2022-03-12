import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { AdmissionGroupsService } from './admissionGroups.service';
import { AdmissionGroup } from './admissionGroup.model';

@Controller('admission-groups')
export class AdmissionGroupsController {
  constructor(
    private readonly admissionGroupsService: AdmissionGroupsService,
  ) {}

  @Get()
  async getAllAdmissionGroups(): Promise<AdmissionGroup[]> {
    const admissionGroups =
      await this.admissionGroupsService.getAdmissionGroups();
    return admissionGroups;
  }

  // [GET] /admission-groups/:id
  @Get(':id')
  async getAddmissionGroup(@Param('id') admissionGroupId: string): Promise<AdmissionGroup> {
    const addmissionGroup =
      await this.admissionGroupsService.getSingleAdmissionGroup(
        admissionGroupId,
      );
    return addmissionGroup;
  }
}
