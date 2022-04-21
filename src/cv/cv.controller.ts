import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import { AddCVDto } from './dto/add-cv.dto';
import { CvsService } from './cv.service';
import { cv } from './cv.entity';
@Controller('cvs')
export class CvsController {
    constructor(private readonly cvsService: CvsService) { }

    // [GET] /getlistcv
    @Get('getlistcv')
    async getListCvs(): Promise<cv[]> {
        const cvs = await this.cvsService.getCvs();
        return cvs;
    }

    // [GET] /getlistcv
    @Post('getlistcvbyuserId')
    async getListCvByUserId(@Body('userId') userId: string) {
        const listCV = await this.cvsService.getCvByUserId(userId);
        return listCV;
    }

    // [POST] /addCv
    @Post('addCv')
    async addContact(@Body() addCvDto: AddCVDto): Promise<cv> {
      return await this.cvsService.insertCv(addCvDto);
    }

    // // [DELETE] /contacts/:id
    // @Delete(':id')
    // async removeContact(@Param('id') contactId: string): Promise<void> {
    //   return await this.contactsService.deleteContact(contactId);
    // }

    // // [GET] /contacts/:id
    // @Get(':id')
    // async getContact(@Param('id') contactId: string): Promise<contact> {
    //   const contact = await this.contactsService.getSingleContact(contactId);
    //   return contact;
    // }

    // // [PATCH] /contacts/:id
    // @Patch(':id')
    // async updateFaculty(
    //   @Param('id') id: string,
    //   @Body() updateContactDto: UpdateContactDto,
    // ): Promise<contact> {
    //   return await this.contactsService.updateContact(id, updateContactDto);
    // }
}
