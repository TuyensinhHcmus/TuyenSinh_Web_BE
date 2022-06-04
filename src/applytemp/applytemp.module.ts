import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { applytemp } from './applytemp.entity';
import { ApplyTempController } from './applytemp.controller';
import { ApplyTempService } from './applytemp.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([applytemp])
  ],
  controllers: [ApplyTempController],
  providers: [ApplyTempService],
})

export class ApplyTempModule {}