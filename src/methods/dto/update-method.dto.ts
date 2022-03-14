import { PartialType } from '@nestjs/swagger';
import { AddMethodDto } from './add-method.dto';

export class UpdateMethodDto extends PartialType(AddMethodDto) {}