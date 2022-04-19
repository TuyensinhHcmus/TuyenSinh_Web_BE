import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller'
import { document } from './document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([document])
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})

export class DocumentsModule {}