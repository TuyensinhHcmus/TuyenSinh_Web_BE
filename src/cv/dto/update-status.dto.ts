import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { AspirationInterface } from 'src/aspiration/dto/aspration.interface';



export class UpdateStatusCVDto {
    @IsNotEmpty()
    @IsNumber()
    cvId: number


    @IsArray()
    @ValidateNested({each: true})
    listAspiration: [AspirationInterface]

    @IsNotEmpty()
    @IsString()
    cvState: string
}
