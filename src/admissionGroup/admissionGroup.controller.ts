import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { admissionsgroup } from './admissionGroup.entity';


import { AdmissionGroupsService } from './admissionGroup.service';

@Controller('admission-groups')
export class AdmissionGroupController {
  constructor(private readonly methodsService: AdmissionGroupsService) {}


  @Get('/getlistbymajor')
  async getMethodByTypeOfTraining(@Query('majorId') majorId: string): Promise<admissionsgroup[]> {
    const methods = await this.methodsService.getAdmissionGroupByMajor(majorId);
    return methods;
  }

  @Get('/getall')
  async getAllAdmissionGroup(): Promise<admissionsgroup[]> {
    const methods = await this.methodsService.getAll();
    return methods;
  }
}