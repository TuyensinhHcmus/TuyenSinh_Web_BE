import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Query,
} from '@nestjs/common';
import { AddCVDto } from './dto/add-cv.dto';
import { CvsService } from './cv.service';
import { cv } from './cv.entity';
import { AddListCVDto } from './dto/add-listcv.dto';
import { UpdateCVDto } from './dto/update-cv.dto';
@Controller('cvs')
export class CvsController {
    constructor(private readonly cvsService: CvsService) { }

    // [GET] /getlistcv
    @Get('getlistcv')
    async getListCvs(
      @Query('userId') userId: string
    ): Promise<any[]> {
        const cvs = await this.cvsService.getListCVByUserId(userId);
        return cvs;
    }

    // [POST] /addACV
    @Post('addACV')
    async addCv(@Body() addCvDto: AddCVDto) {
      return await this.cvsService.insertCv(addCvDto);
    }

    // [POST] /addListCV 
    @Post('addListCV')
    async addListCV(@Body() addListCVData: AddListCVDto) {
      return await this.cvsService.changeStateCv(addListCVData);
    }

    // [Update] /updateCV 
    @Post('updateCV')
    async updateCV (@Body() updateCVData: UpdateCVDto) {
      return await this.cvsService.updateCv(updateCVData);
    }

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
