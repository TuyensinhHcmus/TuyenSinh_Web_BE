import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddMethodDto } from './dto/add-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';

import { method } from './method.entity';

@Injectable()
export class MethodsService {
  constructor(
    @InjectRepository(method) private readonly methodRepo: Repository<method>,
  ) {}

  async insertMethod(addMethodDto: AddMethodDto): Promise<method> {
    const { methodId, name, content, image, parentId } = addMethodDto;

    const method = await this.methodRepo.create({
      methodId: methodId,
      methodName: name,
      methodContent: content,  
      methodImage: image,
      methodParentId: parentId
    });

    const result = await this.methodRepo.save(method);
    return result;
  }

  async getMethods(): Promise<method[]> {
    const methods = await this.methodRepo.find({});

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

    const { methodId, name, content, image, parentId } = updateMethodDto;

    const method = await this.findMethod(id);

    method.methodId = methodId;
    method.methodName = name;
    method.methodContent = content;
    method.methodImage = image;
    method.methodParentId = parentId;

    await this.methodRepo.update({methodId: id}, method);
    
    return method;
  }

  private async findMethod(id: string): Promise<method> {
    let method;

    try {
      method = await this.methodRepo.findOne({methodId: id});
    } catch (error) {
      throw new NotFoundException('Could not find method.');
    }

    if (!method) {
      throw new NotFoundException('Could not find method.');
    }

    return method;
  }
}
