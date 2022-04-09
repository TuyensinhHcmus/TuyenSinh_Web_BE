import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdmissionGroupsService } from './admissionGroups.service';
import { AdmissionGroupsController } from './admissionGroups.controller'
import { AdmissionsGroup } from './admissionGroup.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdmissionsGroup])
  ],
  controllers: [AdmissionGroupsController],
  providers: [AdmissionGroupsService],
})

export class AdmissionGroupsModule {}