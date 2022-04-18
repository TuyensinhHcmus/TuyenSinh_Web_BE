import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TuitionsService } from './tuitions.service';
import { TuitionsController } from './tuitions.controller'
import { tuition } from './tuition.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([tuition])
  ],
  controllers: [TuitionsController],
  providers: [TuitionsService],
})

export class TuitionsModule {}