import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MethodsService } from './methods.service';
import { method } from './method.entity';
import { MethodsController } from './methods.controller'


@Module({
  imports: [
    TypeOrmModule.forFeature([method]),
  ],
  controllers: [MethodsController],
  providers: [MethodsService],
})

export class MethodsModule {}