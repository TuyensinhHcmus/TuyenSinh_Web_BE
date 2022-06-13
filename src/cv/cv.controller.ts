import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AddCVDto } from './dto/add-cv.dto';
import { CvsService } from './cv.service';
import { cv } from './cv.entity';
import { AddListCVDto } from './dto/add-listcv.dto';
import { UpdateCVDto } from './dto/update-cv.dto';
import { AtGuard } from 'src/common/guards';
import { UpdateStatusCVDto } from './dto/update-status.dto';
@Controller('cvs')
export class CvsController {
  constructor(private readonly cvsService: CvsService) { }


  @UseGuards(AtGuard)
  @Get('getAllCVs')
  async getAllCVs(
    @Req() req
  ): Promise<any[]> {
    //const userId = req.user.userId;
    const cvs = await this.cvsService.getAllCVs();
    return cvs;
  }

  // [GET] /getlistcv
  @UseGuards(AtGuard)
  @Get('getlistcv')
  async getListCvs(
    @Req() req
  ): Promise<any[]> {
    const userId = req.user.userId;
    const cvs = await this.cvsService.getListCVByUserId(userId);
    return cvs;
  }

  // [POST] /saveCv
  // Thêm cv vào database
  @UseGuards(AtGuard)
  @Post('saveCv')
  async addCv(
    @Body() addCvDto: AddCVDto,
    @Req() req) {
    const userId = req.user.userId;
    return await this.cvsService.insertCv(addCvDto, userId);
  }

  // [POST] /applyCVs
  // Đổi trạng thái của CV sang đã nộp
  @UseGuards(AtGuard)
  @Post('applyCVs')
  async addListCV(
    @Req() req) {
    const userId = req.user.userId;
    return await this.cvsService.changeStateCv(userId);
  }

  // [Update] /updateCV
  @UseGuards(AtGuard)
  @Post('updateCV')
  async updateCV(
    @Body() updateCVData: UpdateCVDto,
    @Req() req) {
    const userId = req.user.userId;
    return await this.cvsService.updateCv(updateCVData, userId);
  }

  @UseGuards(AtGuard)
  @Post('updateCVsStatusByFile')
  async updateCVsStatusByFile(
    @Body() listUpdateStatusCVDto: Array<UpdateStatusCVDto>,
    @Req() req) {

    return await this.cvsService.updateCVsStatusByFile(listUpdateStatusCVDto);
    // const userRole = req.user.userRole;
    // if(userRole === 'admin')
    // {
    //   return await this.cvsService.updateCVsStatusByFile(updateStatusCVDto);
    // }

    // throw new UnauthorizedException("You don't have permission to perform this action");
  }

  @UseGuards(AtGuard)
  @Delete('deleteCv')
  async deleteCv(
    @Body('cvId') cvId: number,
    //@Req() req
    ) {

    //const userId = req.user.userId;

    return await this.cvsService.deleteCv(cvId);
  }

  // Đổi trạng thái của CV sang đã nộp
  @UseGuards(AtGuard)
  @Post('applyOneCV')
  async applyOneCV(
    @Body('cvId') cvId: number,
    //@Req() req
    ) {

    //const userId = req.user.userId;

    return await this.cvsService.applyOneCV(cvId);
  }

  // Đổi trạng thái của CV và aspiration sang trúng tuyển/không trúng tuyển
  @UseGuards(AtGuard)
  @Post('updateStatusCV')
  async updateStatusCV(
    @Body() updateStatusCVDto: UpdateStatusCVDto,
    @Req() req) {

    return await this.cvsService.updateStatusCV(updateStatusCVDto);
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
