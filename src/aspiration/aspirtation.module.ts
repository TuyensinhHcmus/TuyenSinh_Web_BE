import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { aspiration } from './aspirtation.entity';
import { AspirationService } from './aspirtation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([aspiration])
  ],
  providers: [AspirationService],
})

export class AspirationModule {}