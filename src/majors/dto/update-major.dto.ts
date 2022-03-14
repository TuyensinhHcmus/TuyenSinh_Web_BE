import { PartialType } from '@nestjs/swagger';
import { AddMajorDto } from './add-major.dto';

export class UpdateMajorDto extends PartialType(AddMajorDto) {}