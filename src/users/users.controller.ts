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
    constructor(private readonly usersService: UsersService) {}
  
    @Post()
    async addProduct(
      @Body('userName') userName: string,
      @Body('userEmail') userEmail: string,
    ) {
      const generatedId = await this.usersService.insertUser(
        userName,
        userEmail,
      );
      return { id: generatedId };
    }

    @Get()
    async getAllProducts() {
      const users = await this.usersService.getUsers();  
      return users;
    }
  }  