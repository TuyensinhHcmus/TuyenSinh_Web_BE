import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AddDocumentDto } from './dto/add-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentsService } from './documents.service';
import { document } from './document.entity';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  // [GET] /documents
  @Get()
  async getAllDocuments(): Promise<document[]> {
    const documents = await this.documentsService.getDocuments();
    return documents;
  }

  // [PATCH] /documents/:id
  @Patch(':id')
  async updateDocument(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ): Promise<document> {
    return await this.documentsService.updateDocument(id, updateDocumentDto);
  }
}
