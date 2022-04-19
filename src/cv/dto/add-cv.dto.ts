import { IsNotEmpty } from "class-validator";

export class AddCVDto {
    cvMethodId: string;

    cvUserId: string;

    cvFile: string

    @IsNotEmpty()
    cvState: string;
}