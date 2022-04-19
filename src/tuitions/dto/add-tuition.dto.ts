import { IsNotEmpty } from 'class-validator'

export class AddTuitionDto {
    @IsNotEmpty()
    content: string;
}