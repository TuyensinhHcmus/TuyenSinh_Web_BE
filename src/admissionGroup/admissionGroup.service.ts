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
    @InjectRepository(admissionsgroupmajor) private readonly admissionsGroupMajorRepo: Repository<admissionsgroupmajor>,
  ) {}

  async getAdmissionGroupByMajor(majorId: string): Promise<admissionsgroup[]> {
    // console.log("majorId", majorId);
    

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
    .where('admissionsgroupmajor.majorId = :majorId', { majorId })
    .getMany()

    return admissionGroups;
  }

  async getAdmissionGroupMapMajor(): Promise<any[]> {
    // console.log("majorId", majorId);
    let adgs = await this.admissionsGroupRepo.find({});

    let listMap = await this.admissionsGroupMajorRepo.find({})

    let temp = listMap.map( item => {
      let admissionGroup = adgs.filter( i=> i.agId === item.agId)[0]
      return {
        ...item,
        ...admissionGroup
      }
      
    })

    return temp;
  }

  async getAll(): Promise<admissionsgroup[]> {
    // console.log("majorId", majorId);
    

    const admissionGroups = await this.admissionsGroupRepo.find({})
    return admissionGroups;
  }

}
