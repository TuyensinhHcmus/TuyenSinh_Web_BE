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
import { AddApplyTempDto } from './dto/add-applytemp.dto';
import { UpdateApplyTempDto } from './dto/update-applytemp.dto';

@UseGuards(AtGuard)
@Controller('applytemp')
export class ApplyTempController {
    constructor(private readonly applyTempService: ApplyTempService) { }

    @Post('apply')
    async applytemp(
        @Body() addApplyTempDto: AddApplyTempDto,
        @Req() req): Promise<any> {
        const applyTempUserId = req.user.userId;
        return await this.applyTempService.applytemp(applyTempUserId, addApplyTempDto);
    }


    @Post('update')
    async update(
        @Body() updateApplyTempDto: UpdateApplyTempDto,
        @Req() req): Promise<any> {
        const applyTempUserId = req.user.userId;
        return await this.applyTempService.updateApplyTemp(applyTempUserId, updateApplyTempDto);
    }

    @Get('getList')
    async getList(
        @Req() req): Promise<any> {
        const applyTempUserId = req.user.userId;
        return await this.applyTempService.getList(applyTempUserId);
    }

    // [Delete] /image/deleteImage
    @Delete('deleteApplyTemp')
    async deleteApplyTemp(
        @Body('applyTempId') applyTempId: string
    ): Promise<any> {
        const result = await this.applyTempService.deleteApplyTemp(applyTempId);
        return result;
    }
}