import { IsNotEmpty } from 'class-validator'

export class AddProgramDto {
    @IsNotEmpty()
    name: string;
}