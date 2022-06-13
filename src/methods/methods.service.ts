import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { typeoftraining } from 'src/typeOfTraining/typeOfTraining.entity';
import { Repository } from 'typeorm';

import { AddMethodDto } from './dto/add-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';

import { method } from './method.entity';

@Injectable()
export class MethodsService {
  constructor(
    @InjectRepository(method) private readonly methodRepo: Repository<method>,
  ) { }

  async insertMethod(addMethodDto: AddMethodDto): Promise<method> {
    const {
      methodId,
      name,
      content,
      image,
      parentId,
      dateStart,
      dateEnd,
      typeOfTrainingID,
      endEdit,
      limitAspiration,
      object,
      startEdit,
      target
    } = addMethodDto;

    let isExist = await this.methodRepo.find({ methodId: methodId })

    if (isExist.length > 0) {
      throw new HttpException("Method is Existed", 409);
    }

    const method = await this.methodRepo.create({
      methodId: methodId,
      methodName: name,
      methodContent: content,
      methodImage: image,
      methodParentId: parentId,
      methodDateStart: dateStart,
      methodDateEnd: dateEnd,
      methodTypeOfTrainingID: typeOfTrainingID,
      methodEndEdit: endEdit,
      methodLimitAspiration: limitAspiration,
      methodObject: object,
      methodStartEdit: startEdit,
      methodTarget: target
    });

    const result = await this.methodRepo.save(method);
    return result;
  }

  async getMethods(): Promise<method[]> {
    const methods = await this.methodRepo.find({});

    return methods;
  }

  async getMethodsByTypeOfTrainingId(typeOfTrainingId: string): Promise<method[]> {
    const methods = await this.methodRepo.find({
      methodTypeOfTrainingID: typeOfTrainingId
    });

    return methods;
  }

  async deleteMethod(methodId: string): Promise<void> {
    try {
      await this.methodRepo.delete({ methodId: methodId });
    } catch (err) {
      throw new NotFoundException('Could not delete method.', err);
    }
  }

  async getSingleMethod(methodId: string): Promise<method> {
    const method = await this.findMethod(methodId);
    return method;
  }

  async updateMethod(id: string, updateMethodDto: UpdateMethodDto): Promise<method> {

    const {
      name,
      content,
      image,
      parentId,
      dateStart,
      dateEnd,
      typeOfTrainingID,
      endEdit,
      limitAspiration,
      object,
      startEdit,
      target
    } = updateMethodDto;

    
    let isExist = await this.methodRepo.find({ methodId: id })
    
    if (isExist.length === 0) {
      throw new HttpException("Method is not Existed", 404);
    }
    
    const method = isExist[0];

    method.methodName = name;
    method.methodContent = content;
    method.methodImage = image;
    method.methodParentId = parentId;
    method.methodDateStart = dateStart;
    method.methodDateEnd = dateEnd;
    method.methodTypeOfTrainingID = typeOfTrainingID;
    method.methodEndEdit = endEdit;
    method.methodLimitAspiration = limitAspiration;
    method.methodObject = object;
    method.methodStartEdit = startEdit;
    method.methodTarget = target;

    await this.methodRepo.update({ methodId: id }, method);

    return method;
  }

  private async findMethod(id: string): Promise<method> {
    let method;

    try {
      method = await this.methodRepo.findOne({ methodId: id });
    } catch (error) {
      throw new NotFoundException('Could not find method.');
    }

    if (!method) {
      throw new NotFoundException('Could not find method.');
    }

    return method;
  }

  async getMethodCanApply() {
    const methods = await this.methodRepo
      .createQueryBuilder('method')
      .leftJoinAndMapOne('method.methodTypeOfTrainingID', typeoftraining, 'typeoftraining', 'typeoftraining.typeOfTrainingId = method.methodTypeOfTrainingID')
      .where("(method.methodParentId != '') and (CURRENT_TIMESTAMP between method.methodDateStart AND method.methodDateEnd)")
      .getMany()
    return methods;
  }

  async getStatusApply(methodId: string): Promise<boolean> {
    const method = await this.methodRepo
      .createQueryBuilder('method')
      .where("(method.methodId = :id) and (CURRENT_TIMESTAMP between method.methodDateStart AND method.methodDateEnd)", { id: methodId })
      .getOne()

    return !!method;
  }
}
