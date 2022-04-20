import { PartialType } from '@nestjs/swagger';
import { AddAspirationDto } from './add-aspiration.dto';

export class UpdateAspirationDto extends PartialType(AddAspirationDto) {}