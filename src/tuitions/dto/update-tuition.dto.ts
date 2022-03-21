import { PartialType } from '@nestjs/swagger';
import { AddTuitionDto } from './add-tuition.dto';

export class UpdateTuitionDto extends PartialType(AddTuitionDto) {}