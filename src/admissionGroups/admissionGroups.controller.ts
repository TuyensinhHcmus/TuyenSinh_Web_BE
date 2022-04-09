import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { AdmissionsGroup } from './admissionGroup.entity';
import { AdmissionGroupsService } from './admissionGroups.service';


@Controller('admission-groups')
export class AdmissionGroupsController {
  constructor(
    private readonly admissionGroupsService: AdmissionGroupsService,
  ) {}

  @Get()
  async getAllAdmissionGroups(): Promise<AdmissionsGroup[]> {
    const admissionGroups = await this.admissionGroupsService.getAdmissionGroups();
    return admissionGroups;
  }

  // [GET] /admission-groups/:idGroup
  @Get(':idGroup')
  async getAdmissionGroup(@Param('idGroup') admissionGroupId: string): Promise<AdmissionsGroup> {
    const admissionGroup =
      await this.admissionGroupsService.getSingleAdmissionGroup(
        admissionGroupId
      );
    return admissionGroup;
  }

}
