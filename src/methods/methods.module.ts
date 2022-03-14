import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MethodsService } from './methods.service';
import { MethodSchema } from './method.model';
import { MethodsController } from './methods.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Method', schema: MethodSchema }]),
  ],
  controllers: [MethodsController],
  providers: [MethodsService],
})

export class MethodsModule {}