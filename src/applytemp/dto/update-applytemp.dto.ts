import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AddApplyTempDto } from './add-applytemp.dto';


export class UpdateApplyTempDto extends PartialType(AddApplyTempDto) {
    @IsNotEmpty()
    applyTempId: string
}