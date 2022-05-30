import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { typeoftraining } from 'src/typeOfTraining/typeOfTraining.entity';
import { Repository } from 'typeorm';
import { admissionsgroup } from './admissionGroup.entity';

@Injectable()
export class AdmissionGroupsService {
  constructor(
    @InjectRepository(admissionsgroup) private readonly admissionsGroupRepo: Repository<admissionsgroup>,
  ) {}

  // async insertMethod(addMethodDto: AddMethodDto): Promise<method> {
  //   const { methodId, name, content, image, parentId, dateStart, dateEnd, typeOfTrainingID } = addMethodDto;

  //   const method = await this.methodRepo.create({
  //     methodId: methodId,
  //     methodName: name,
  //     methodContent: content,  
  //     methodImage: image,
  //     methodParentId: parentId,
  //     methodDateStart: dateStart,
  //     methodDateEnd: dateEnd,
  //     methodTypeOfTrainingID: typeOfTrainingID
  //   });

  //   const result = await this.methodRepo.save(method);
  //   return result;
  // }

  // async getMethods(): Promise<method[]> {
  //   const methods = await this.methodRepo.find({});

  //   return methods;
  // }

  async getAdmissionGroupByMajor(typeOfTrainingId: string): Promise<admissionsgroup[]> {
    const methods = await this.admissionsGroupRepo.find({
      
    });

    return methods;
  }

  // async deleteMethod(methodId: string): Promise<void> {
  //   try {
  //     await this.methodRepo.delete({ methodId: methodId });
  //   } catch (err) {
  //     throw new NotFoundException('Could not delete method.', err);
  //   }
  // }

  // async getSingleMethod(methodId: string): Promise<method> {
  //   const method = await this.findMethod(methodId);
  //   return method;
  // }

  // async updateMethod(id: string, updateMethodDto: UpdateMethodDto): Promise<method> {

  //   const { methodId, name, content, image, parentId, dateStart, dateEnd, typeOfTrainingID } = updateMethodDto;

  //   const method = await this.findMethod(id);

  //   method.methodId = methodId;
  //   method.methodName = name;
  //   method.methodContent = content;
  //   method.methodImage = image;
  //   method.methodParentId = parentId;
  //   method.methodDateStart = dateStart;
  //   method.methodDateEnd = dateEnd;
  //   method.methodTypeOfTrainingID = typeOfTrainingID;

  //   await this.methodRepo.update({methodId: id}, method);
    
  //   return method;
  // }

  // private async findMethod(id: string): Promise<method> {
  //   let method;

  //   try {
  //     method = await this.methodRepo.findOne({methodId: id});
  //   } catch (error) {
  //     throw new NotFoundException('Could not find method.');
  //   }

  //   if (!method) {
  //     throw new NotFoundException('Could not find method.');
  //   }

  //   return method;
  // }

  // async getMethodCanApply()
  // {
  //   const methods = await this.methodRepo
  //     .createQueryBuilder('method')
  //     .leftJoinAndMapOne('method.methodTypeOfTrainingID', typeoftraining, 'typeoftraining', 'typeoftraining.typeOfTrainingId = method.methodTypeOfTrainingID')
  //     .where("(method.methodParentId != '') and (CURRENT_TIMESTAMP between method.methodDateStart AND method.methodDateEnd)")
  //     .getMany()
  //   return methods;
  // }

  // async getStatusApply(methodId: string): Promise<boolean>
  // {
  //   const method = await this.methodRepo
  //     .createQueryBuilder('method')
  //     .where("(method.methodId = :id) and (CURRENT_TIMESTAMP between method.methodDateStart AND method.methodDateEnd)", { id: methodId })
  //     .getOne()

  //   return !!method;
  // }
}
