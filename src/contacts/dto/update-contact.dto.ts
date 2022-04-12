import { PartialType } from '@nestjs/swagger';
import { AddContactDto } from './add-contact.dto';

export class UpdateContactDto extends PartialType(AddContactDto) {}