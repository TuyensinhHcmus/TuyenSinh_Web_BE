import { PartialType } from '@nestjs/swagger';
import { AddImageDto } from './add-image.dto';


export class UpdateImageDto extends PartialType(AddImageDto) {}