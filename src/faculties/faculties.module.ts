import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacultiesService } from './faculties.service';
import { FacultiesController } from './faculties.controller'
import { faculty } from './faculty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([faculty])
  ],
  controllers: [FacultiesController],
  providers: [FacultiesService],
})

export class FacultiesModule {}