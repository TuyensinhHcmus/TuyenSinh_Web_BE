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

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/register')
  async addUser(
    @Body('userName') userName: string,
    @Body('userEmail') userEmail: string,
    @Body('userPassword') userPassword: string,
  ) {

    const hashedPassword = await this.usersService.hashPassword(userPassword);

    const newUser = await this.usersService.insertUser(
      userName,
      userEmail,
      hashedPassword
    );
    return {...newUser, id: newUser.userId};
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  // @Get(':id')
  // async updatePasswordUser(
  //   @Param('id') userId: string,
  //   @Body('userPassword') userPassword: string,
  // ) {
  //   const userPasswordHash = await this.usersService.hashPassword(userPassword);
  //   await this.usersService.updatePasswordUser(userId, userPasswordHash);

  //   return userPasswordHash;
  // }

  @Get('getUserByQuantity')
  async getNumberUser(
    @Query('perPage') perPage: number,
    @Query('page') page: number,
  )
  {
    const users = await this.usersService.getUsersByAmount(perPage, page);
    return users;
  }
}  