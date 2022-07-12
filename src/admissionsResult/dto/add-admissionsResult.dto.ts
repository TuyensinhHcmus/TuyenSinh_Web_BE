import { IsNotEmpty } from 'class-validator'

interface objectResult {
    adrsMajorName: string,
    adrsFullName: string,
    adrsMethod: string,
    adrsScore: string,
    adrsPhone: string,
    adrsEmail: string,
    adrsMessageSms: string
};

export class AddAdmissionsResultDto {
    @IsNotEmpty()
    dataImport: objectResult[];
}