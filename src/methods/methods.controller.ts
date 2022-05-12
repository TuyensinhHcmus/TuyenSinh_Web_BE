import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

import { AddMethodDto } from './dto/add-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';
import { MethodsService } from './methods.service';
import { method } from './method.entity';

@Controller('methods')
export class MethodsController {
  constructor(private readonly methodsService: MethodsService) {}

  // [GET] /methods/getMethodCanApply
  @Get('getMethodCanApply')
  async getMethodCanApply()
  {
    return await this.methodsService.getMethodCanApply();
  }

  // [GET] /methods/getStatusApply
  @Get('getStatusApply')
  async getStatusApply(
    @Query('methodId') methodId: string
  ) {
    return await this.methodsService.getStatusApply(methodId);
  }

  // [GET] /methods
  @Get()
  async getAllMethods(): Promise<method[]> {
    const methods = await this.methodsService.getMethods();
    return methods;
  }

  // [POST] /methods
  @Post()
  async addMethod(@Body() addMethodDto: AddMethodDto): Promise<method> {
    return await this.methodsService.insertMethod(addMethodDto);
  }

  // [GET] /methods/:id
  @Get('/getlistbytypeoftraining/:id')
  async getMethodByTypeOfTraining(@Param('id') typeOfTrainingId: string): Promise<method[]> {
    const methods = await this.methodsService.getMethodsByTypeOfTrainingId(typeOfTrainingId);
    return methods;
  }

  // [DELETE] /methods/:id
  @Delete(':id')
  async removeMethod(@Param('id') methodId: string): Promise<void> {
    return await this.methodsService.deleteMethod(methodId);
  }

  // [GET] /methods/:id
  @Get(':id')
  async getMethod(@Param('id') methodId: string): Promise<method> {
    const method = await this.methodsService.getSingleMethod(methodId);
    return method;
  }

  // [PATCH] /methos/:id
  @Patch(':id')
  async updateMethod(
    @Param('id') idMethod: string,
    @Body() updateMethodDto: UpdateMethodDto,
  ): Promise<method> {
    return await this.methodsService.updateMethod(idMethod, updateMethodDto);
  }
}
