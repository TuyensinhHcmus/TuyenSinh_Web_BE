import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdmissionGroupsService } from './admissionGroup.service';
import { admissionsgroup, admissionsgroupmajor } from './admissionGroup.entity';
import { AdmissionGroupController } from './admissionGroup.controller'


@Module({
  imports: [
    TypeOrmModule.forFeature([admissionsgroup, admissionsgroupmajor]),
  ],
  controllers: [AdmissionGroupController],
  providers: [AdmissionGroupsService],
  exports:[AdmissionGroupsService]
})

export class AdmissionGroupModule {}