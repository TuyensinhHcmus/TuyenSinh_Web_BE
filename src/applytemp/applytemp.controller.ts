import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UseGuards,
    Req,
} from '@nestjs/common';
import { AtGuard } from 'src/common/guards';
import { ApplyTempService } from './applytemp.service';

@UseGuards(AtGuard)
@Controller('applytemp')
export class ApplyTempController {
    constructor(private readonly applyTempService: ApplyTempService) { }

    @Post('apply')
    async applytemp(
        @Body('applyTempMajorId') applyTempMajorId: string,
        @Body('applyTempTotalScore') applyTempTotalScore: number,
        @Req() req): Promise<any> {
        const applyTempUserId = req.user.userId;
        return await this.applyTempService.applytemp(applyTempUserId, applyTempMajorId, applyTempTotalScore);
    }


    @Post('update')
    async update(
        @Body('applyTempId') applyTempId: string,
        @Body('applyTempMajorId') applyTempMajorId: string,
        @Body('applyTempTotalScore') applyTempTotalScore: number,
        @Req() req): Promise<any> {
        const applyTempUserId = req.user.userId;
        return await this.applyTempService.updateApplyTemp(applyTempUserId, applyTempId, applyTempMajorId, applyTempTotalScore);
    }

    @Get('getList')
    async getList(
        @Req() req): Promise<any> {
        const applyTempUserId = req.user.userId;
        return await this.applyTempService.getList(applyTempUserId);
    }
}