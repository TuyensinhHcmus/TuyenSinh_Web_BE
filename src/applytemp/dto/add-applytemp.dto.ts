import { IsNotEmpty } from 'class-validator'

export class AddApplyTempDto {
    @IsNotEmpty()
    applyTempMajorId: string;

    @IsNotEmpty()
    applyTempTotalScore: number;

    applyTempMajorName: string;

    applyTempScore1: number;

    applyTempScore2: number;

    applyTempScore3: number;

    applyTempGroupId: string;
}