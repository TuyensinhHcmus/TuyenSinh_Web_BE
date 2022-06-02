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
} from '@nestjs/common';
import { AtGuard } from 'src/common/guards';
import ChangePasswordDto from './dto/change-password.dto';
import { EditUserDto } from './dto/edit-user-dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/ban')
  async banUser(
    @Body('userId') userId: string,
    @Body('isBlock') isBlock: boolean
  ) {

    const res = await this.usersService.banUser(userId, isBlock);
    return res;
  }

  @UseGuards(AtGuard)
  @Post('/editUserInfor')
  async editUserInfor(
    @Req() req,
    @Body() userInfor: EditUserDto
  ) {
    const userId = req.user.userId;
    const res = await this.usersService.editUserById(userId, userInfor);
    return res;
  }

  @UseGuards(AtGuard)
  @Get('/getUserInfor')
  async getUserInfor(
    @Req() req
  ) {
    const userId = req.user.userId
    const res = await this.usersService.getUserById(userId);
    return res;
  }


  @Post('/register')
  async addUser(
    @Body('userName') userName: string,
    @Body('userEmail') userEmail: string,
    @Body('userPhone') userPhone: string,
    @Body('userPassword') userPassword: string,
    @Body('userContactAddress') userContactAddress: string,
  ) {

    const hashedPassword = await this.usersService.hashPassword(userPassword);

    const newUser = await this.usersService.insertUser(
      userName,
      userEmail,
      hashedPassword,
      userPhone,
      userContactAddress,
      '',
    );
    return { ...newUser, id: newUser.userId };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @UseGuards(AtGuard)
  @Post('change-password')
  async resetPassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req
  ) {
    const userId = req.user.userId;
    return this.usersService.changePassword(changePasswordDto, userId);
  }

  @Get('getUserByQuantity')
  async getNumberUser(
    @Query('perPage') perPage: number,
    @Query('page') page: number,
  ) {
    const users = await this.usersService.getUsersByAmount(perPage, page);
    return users;
  }

  @UseGuards(AtGuard)
  @Post('/postToken')
  async postToken(
    @Req() req,
    @Body('deviceToken') deviceToken: string
  ) {
    const userId = req.user.userId;
    const res = await this.usersService.updateDeviceToken(userId, deviceToken);
    return res;
  }
}  