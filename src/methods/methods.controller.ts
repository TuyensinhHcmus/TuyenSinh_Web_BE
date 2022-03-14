import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { AddMethodDto } from './dto/add-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';

import { MethodsService } from './methods.service';
import { Method } from './method.model';

@Controller('methods')
export class MethodsController {
  constructor(private readonly methodsService: MethodsService) {}

  // [GET] /methods
  @Get()
  async getAllMethods(): Promise<Method[]> {
    const methods = await this.methodsService.getMethods();
    return methods;
  }

  // [POST] /methods
  @Post()
  async addMethod(@Body() addMethodDto: AddMethodDto): Promise<Method> {
    return await this.methodsService.insertMethod(addMethodDto);
  }

  // [DELETE] /methods/:id
  @Delete(':id')
  async removeMethod(@Param('id') methodId: string): Promise<void> {
    return await this.methodsService.deleteMethod(methodId);
  }

  // [GET] /methods/:id
  @Get(':id')
  async getMethod(@Param('id') methodId: string): Promise<Method> {
    const method = await this.methodsService.getSingleMethod(methodId);
    return method;
  }

  // [PATCH] /methos/:id
  @Patch(':id')
  async updateMethod(
    @Param('id') idMethod: string,
    @Body() updateMethodDto: UpdateMethodDto,
  ): Promise<Method> {
    return await this.methodsService.updateMethod(idMethod, updateMethodDto);
  }
}
