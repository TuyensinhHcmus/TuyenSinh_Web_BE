import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProgramsService } from './programs.service';
import { ProgramSchema } from './program.model';
import { ProgramsController } from './programs.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Program', schema: ProgramSchema }]),
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService],
})

export class ProgramsModule {}