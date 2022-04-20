import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CvInterface } from "./cv.interface";

export class AddCVDto {
    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    method: string

    @IsArray()
    @ValidateNested({each: true})
    listAspiration: [CvInterface]

    @IsString()
    fileUrl: string
}