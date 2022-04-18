import { IsNotEmpty } from 'class-validator'

export class AddFacultyDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    imageCompare: string;

    @IsNotEmpty()
    imageHighlight: string;

    @IsNotEmpty()
    introduction: string;
}