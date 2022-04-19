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
 
   // [POST] /documents
   @Post()
   async addDocument(@Body() addDocumentDto: AddDocumentDto): Promise<document> {
     return await this.documentsService.insertDocument(addDocumentDto);
   }
 
   // [DELETE] /documents/:id
   @Delete(':id')
   async removeDocument(@Param('id') documentId: string): Promise<void> {
     return await this.documentsService.deleteDocument(documentId);
   }
 
   // [GET] /documents/:id
   @Get(':id')
   async getDocument(@Param('id') documentId: string): Promise<document> {
     const document = await this.documentsService.getSingleDocument(documentId);
     return document;
   }
}
