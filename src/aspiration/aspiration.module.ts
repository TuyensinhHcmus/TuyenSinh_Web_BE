import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { aspiration } from './aspiration.entity';
import { AspirationService } from './aspiration.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([aspiration])
  ],
  providers: [AspirationService],
  exports: [AspirationService]
})

export class AspirationModule {}