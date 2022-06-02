import { PartialType } from "@nestjs/swagger";
import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { SaveCVAIDto } from "src/cvapplyinformation/dto/save-cvai.dto";
import { CvInterface } from "./cv.interface";

export class AddCVDto extends PartialType(SaveCVAIDto){
    @IsNotEmpty()
    method: string

    @IsArray()
    @ValidateNested({each: true})
    listAspiration: [CvInterface]

    //@IsString()
    fileUrl: string

    //@IsString()
    userName: string

    //@IsString()
    userGender: string

    //@IsString()
    userPhone: string

    //@IsString()
    userEmail: string

    //@IsString()
    userEthnicity: string

    //@IsString()
    userNationality: string

    //@IsDateString()
    userBirthday: Date

    //@IsString()
    userBirthplace: string
    
    //@IsString()
    userContactAddress: string

    //@IsString()
    userProvinceResidence: string

    //@IsString()
    userDistrictResidence: string

    //@IsString()
    userAddress12: string

    //@IsString()
    userSchool12: string

    //@IsString()
    userAddress11: string

    //@IsString()
    userSchool11: string

    //@IsString()
    userAddress10: string

    //@IsString()
    userSchool10: string

    userIdentityNumber: string

    // userWardResidence: string

    // userStreetResidence: string
}