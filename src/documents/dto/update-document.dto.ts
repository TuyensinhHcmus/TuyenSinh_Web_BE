import { PartialType } from '@nestjs/swagger';
import { AddDocumentDto } from './add-document.dto';

export class UpdateDocumentDto extends PartialType(AddDocumentDto) {}