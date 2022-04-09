import { IsNotEmpty, IsString } from 'class-validator'

export class AddMajorDto {

    @IsNotEmpty()
    majorId: string;

    @IsNotEmpty()
    facultyId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    introduction: string;

    @IsNotEmpty()
    imageName: string;

    @IsNotEmpty()
    target: string;

    @IsNotEmpty()
    program: string;

    @IsString()
    majorVideo: string;
}