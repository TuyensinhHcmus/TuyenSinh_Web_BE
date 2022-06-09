import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SaveCVAIDto {
    @IsString()
    cvaiGraduateUniversity: string

    @IsNumber()
    cvaiUniversityGPA: number

    @IsNumber()
    cvaiUniversityGraduateYear: number

    @IsString()
    cvaiGraduateCollege: string

    @IsNumber()
    cvaiCollegeGPA: number

    @IsNumber()
    cvaiCollegeGraduateYear: number

    @IsString()
    cvaiPriorityArea: string

    @IsNumber()
    cvaiGPA12: number

    @IsNumber()
    cvaiGPA11: number

    @IsNumber()
    cvaiGPA10: number

    @IsNumber()
    cvaiHighSchoolGraduateYear: number

    @IsString()
    cvaiCapacity12: string

    @IsString()
    cvaiConduct12: string

    @IsString()
    cvaiCapacity11: string

    @IsString()
    cvaiConduct11: string

    @IsString()
    cvaiCapacity10: string

    @IsString()
    cvaiConduct10: string

    @IsString()
    cvaiProvincialExcellentSubject: string

    @IsNumber()
    cvaiProvincialExcellentYear: number

    @IsString()
    cvaiProvincialExcellentAward: string

    @IsNumber()
    cvaiIeltsCertificateScore: number

    @IsDateString()
    cvaiIeltsCertificateExpiration: Date

    @IsNumber()
    cvaiToeflCertificateScore: number

    @IsDateString()
    cvaiToeflCertificateExpiration: Date

    @IsNumber()
    cvaiHaveVietnameseCertificate: number

    @IsString()
    cvaiVietnameseCertificateLevel: string

    @IsString()
    cvaiEmail: string

    @IsString()
    cvaiPhone: string
}