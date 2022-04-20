import { IsNotEmpty, IsString } from "class-validator";


export class AddListCVDto {
    @IsNotEmpty()
    @IsString()
    userId: string
}