import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
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

    const _id = await this.usersService.insertUser(
      userName,
      userEmail,
      hashedPassword
    );
    return { _id: _id };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('userPassword') userPassword: string,
  ) {
    const userPasswordHash = await this.usersService.hashPassword(userPassword);
    await this.usersService.updateUser(userId, userPasswordHash);

    return userPasswordHash;
  }
}  