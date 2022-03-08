import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';

import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(@InjectModel('User')private readonly usesrModel: Model<User>){}

  async insertUser(userName: string, userEmail: string){
     const newUser = new this.usesrModel({
        userName,
        userEmail
     })

     const result = await newUser.save();
     
     console.log(result);

     return 'addUser';
  }

  async getUsers() {
    const users = await this.usesrModel.find().exec();
    return users as User[]; 
  }
}