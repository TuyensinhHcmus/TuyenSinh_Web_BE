import { PartialType } from '@nestjs/swagger';
import { AddProgramDto } from './add-program.dto';

export class UpdateProgramDto extends PartialType(AddProgramDto) {}