import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacultiesService } from './faculties.service';
import { FacultiesController } from './faculties.controller'
import { faculty } from './faculty.entity';
import { MajorsService } from 'src/majors/majors.service';
import { major } from 'src/majors/major.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([faculty, major])
  ],
  controllers: [FacultiesController],
  providers: [FacultiesService],
})

export class FacultiesModule {}