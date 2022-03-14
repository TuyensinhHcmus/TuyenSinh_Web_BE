import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddMethodDto } from './dto/add-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';

import { Method } from './method.model';

@Injectable()
export class MethodsService {
  constructor(
    @InjectModel('Method') private readonly methodModel: Model<Method>,
  ) {}

  async insertMethod(addMethodDto: AddMethodDto): Promise<Method> {
    const { name, content, image } = addMethodDto;

    const method = new this.methodModel({
      methodName: name,
      methodContent: content,  
      methodImage: image,
    });

    const result = await method.save();
    return result;
  }

  async getMethods(): Promise<Method[]> {
    const methods = await this.methodModel.find({});

    return methods;
  }

  async deleteMethod(methodId: string): Promise<void> {
    try {
      await this.methodModel.deleteOne({ _id: methodId }).exec();
    } catch (err) {
      throw new NotFoundException('Could not delete method.', err);
    }
  }

  async getSingleMethod(methodId: string): Promise<Method> {
    const method = await this.findMethod(methodId);
    return method;
  }

  async updateMethod(id: string, updateMethodDto: UpdateMethodDto): Promise<Method> {

    const { name, content, image } = updateMethodDto;

    const method = await this.findMethod(id);

    method.methodName = name;
    method.methodContent = content;
    method.methodImage = image;

    method.save();
    
    return method;
  }

  private async findMethod(id: string): Promise<Method> {
    let method;

    try {
      method = await this.methodModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find method.');
    }

    if (!method) {
      throw new NotFoundException('Could not find method.');
    }

    return method;
  }
}
