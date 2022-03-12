import { PartialType } from '@nestjs/swagger';
import { AddFacultyDto } from './add-faculty.dto';

export class UpdateFacultyDto extends PartialType(AddFacultyDto) {}