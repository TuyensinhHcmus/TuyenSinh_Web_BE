import { IsNotEmpty, IsString } from 'class-validator'


export class SchoolInforDto {

    schoolinforId: number;

    @IsNotEmpty() 
    schoolinforIntroduction: string

    @IsNotEmpty() 
    schoolinforProfessor: number

    @IsNotEmpty() 
    schoolinforAssociateProfessor: number

    @IsNotEmpty() 
    schoolinforMaster: number

    @IsNotEmpty() 
    schoolinforDoctor: number

    @IsNotEmpty() 
    schoolinforMasterMajor: number

    @IsNotEmpty() 
    schoolinforDoctorMajor: number

    @IsNotEmpty() 
    schoolinforBachelorMajor: number

    @IsNotEmpty() 
    schoolinforVideoLink: string

    @IsNotEmpty() 
    schoolinforImages: string

    @IsNotEmpty() 
    schoolinfoBenchmarkImage: string
}