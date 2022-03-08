import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdmissionGroupsController } from './admissionGroups.controller';
import { AdmissionGroupsSchema } from './admissionGroups.model';
import { AdmissionGroupsSerivce } from './admissionGroups.service';

@Module({
    imports:  [MongooseModule.forFeature([{name:'AdmissionGroups', schema: AdmissionGroupsSchema}])],
    controllers: [AdmissionGroupsController],
    providers: [AdmissionGroupsSerivce],
})
export class AdmissionGroupsModule {}