import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdmissionGroupsService } from './admissionGroups.service';
import { AdmissionGroupSchema } from './admissionGroup.model';
import { AdmissionGroupsController } from './admissionGroups.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'AdmissionGroup', schema: AdmissionGroupSchema }]),
  ],
  controllers: [AdmissionGroupsController],
  providers: [AdmissionGroupsService],
})

export class AdmissionGroupsModule {}