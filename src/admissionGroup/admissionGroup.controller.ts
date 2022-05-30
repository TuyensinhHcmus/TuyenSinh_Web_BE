import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { admissionsgroup } from './admissionGroup.entity';


import { AdmissionGroupsService } from './admissionGroup.service';

@Controller('methods')
export class AdmissionGroupController {
  constructor(private readonly methodsService: AdmissionGroupsService) {}

  // [GET] /methods/:id
  @Get('/getlistbymajor')
  async getMethodByTypeOfTraining(@Query('majorId') majorId: string): Promise<admissionsgroup[]> {
    const methods = await this.methodsService.getAdmissionGroupByMajor(majorId);
    return methods;
  }
}