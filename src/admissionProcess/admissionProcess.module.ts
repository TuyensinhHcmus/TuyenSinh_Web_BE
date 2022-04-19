import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdmissionProcessService } from './admissionProcess.service';
import { AdmissionProcessController } from './admissionProcess.controller';
import { admissionProcess } from './admissionProcess.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([admissionProcess])
  ],
  controllers: [AdmissionProcessController],
  providers: [AdmissionProcessService],
})

export class AdmissionProcessModule {}