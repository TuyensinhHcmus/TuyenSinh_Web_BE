import { IsNotEmpty } from 'class-validator'

export class TypeProgramDto {
    @IsNotEmpty() 
    typeProgramId: string

    @IsNotEmpty() 
    typeProgramName: string

    @IsNotEmpty() 
    typeProgramTypeOfTrainingID: string

    @IsNotEmpty() 
    typeProgramFormId: string
}