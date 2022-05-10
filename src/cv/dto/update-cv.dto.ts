import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AddCVDto } from './add-cv.dto';

export class UpdateCVDto extends PartialType(AddCVDto) {
    @IsNotEmpty()
    @IsNumber()
    cvId: number
}