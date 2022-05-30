import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdmissionGroupsService } from './admissionGroup.service';
import { admissionsgroup } from './admissionGroup.entity';
import { AdmissionGroupController } from './admissionGroup.controller'


@Module({
  imports: [
    TypeOrmModule.forFeature([admissionsgroup]),
  ],
  controllers: [AdmissionGroupController],
  providers: [AdmissionGroupsService],
})

export class MethodsModule {}