import { PartialType } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { SaveCVAIDto } from "./save-cvai.dto";

export class UpdateCVAIDto extends PartialType(SaveCVAIDto) {
    @IsNotEmpty()
    @IsNumber()
    cvaiId: number
}