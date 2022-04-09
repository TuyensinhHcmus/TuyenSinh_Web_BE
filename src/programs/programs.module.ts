import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgramsService } from './programs.service';
import { program } from './program.entity';
import { ProgramsController } from './programs.controller'


@Module({
  imports: [
    TypeOrmModule.forFeature([program]),
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService],
})

export class ProgramsModule {}