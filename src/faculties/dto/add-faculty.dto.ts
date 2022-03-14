import { IsNotEmpty } from 'class-validator'

export class AddFacultyDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    introduction: string;

    @IsNotEmpty()
    imageCompare: string;

    @IsNotEmpty()
    imageHighlight: string;
}