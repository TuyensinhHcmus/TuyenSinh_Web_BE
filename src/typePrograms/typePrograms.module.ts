import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeProgramsService } from './typePrograms.service';
import { TypeProgramsController } from './typePrograms.controller'
import { typeProgram } from './typeProgram.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([typeProgram])
  ],
  controllers: [TypeProgramsController],
  providers: [TypeProgramsService],
})

export class TypeProgramsModule {}