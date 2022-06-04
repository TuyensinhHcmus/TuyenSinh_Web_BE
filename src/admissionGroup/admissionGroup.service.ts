import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { typeoftraining } from 'src/typeOfTraining/typeOfTraining.entity';
import { Repository } from 'typeorm';
import { admissionsgroup, admissionsgroupmajor } from './admissionGroup.entity';
import { major } from 'src/majors/major.entity';

@Injectable()
export class AdmissionGroupsService {
  constructor(
    @InjectRepository(admissionsgroup) private readonly admissionsGroupRepo: Repository<admissionsgroup>,
  ) {}

  async getAdmissionGroupByMajor(majorId: string): Promise<admissionsgroup[]> {
    const admissionGroups = await this.admissionsGroupRepo.createQueryBuilder('admissionsgroup')
    .leftJoinAndMapOne('admissionsgroup.admissionGroupMapMajor', admissionsgroupmajor, 'admissionsgroupmajor', 'admissionsgroup.agId = admissionsgroupmajor.agId')
    .select([
          "admissionsgroup.agId",
          "admissionsgroup.agFirstSubject",
          "admissionsgroup.agSecondSubject",
          "admissionsgroup.agThirdSubject",

          "admissionsgroupmajor.agId",
          "admissionsgroupmajor.majorId",
        ],)
    .where('admissionsgroupmajor.majorId = :majorId', { major })
    .getMany()

    return admissionGroups;
  }

}
