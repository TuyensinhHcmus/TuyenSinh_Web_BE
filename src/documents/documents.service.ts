import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddDocumentDto } from './dto/add-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { document } from './document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(document)
    private readonly documentsRepo: Repository<document>,
  ) {}

  async getDocuments(): Promise<document []> {
    const documents = await this.documentsRepo.find({});
    return documents;
  }

  async updateDocument(id: string, updateDocumentDto: UpdateDocumentDto): Promise<document> {

    const { title, content, image } = updateDocumentDto;

    const document = await this.findDocument(id);

    document.documentTitle = title;
    document.documentContent = content;
    document.documentImage = image;
   
    await this.documentsRepo.update({documentId: parseInt(id)}, document);

    return document;
  }

  async insertDocument(addDocumentDto: AddDocumentDto): Promise<document> {
    const { title, content, image } = addDocumentDto;

    const document = await this.documentsRepo.create({
      documentTitle: title,
      documentContent: content,
      documentImage: image
    })

    const result = await this.documentsRepo.save(document);

    return result;
  }

  async deleteDocument(documentId: string): Promise<void> {
    try {
      await this.documentsRepo.delete({ documentId: parseInt(documentId) })
    } catch (err) {
      throw new NotFoundException('Could not delete document.', err);
    }
  }

  async getSingleDocument(documentId: string): Promise<document> {
    const document = await this.findDocument(documentId);
    return document;
  }

  private async findDocument(id: string): Promise<document> {
    let document;

    try {
      document = await this.documentsRepo.findOne({documentId: parseInt(id)});
    } catch (error) {
      throw new NotFoundException('Could not find document.');
    }

    if (!document) {
      throw new NotFoundException('Could not find document.');
    }

    return document;
  }
}
