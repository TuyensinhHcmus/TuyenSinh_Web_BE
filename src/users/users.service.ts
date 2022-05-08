import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

import { User } from './users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './users.entity';
import { Repository } from 'typeorm';
import { EditUserDto } from './dto/edit-user-dto';
import { string } from '@hapi/joi';
const { v4: uuidv4 } = require('uuid')


@Injectable()
export class UsersService {
  private salt = 10;
  constructor(
    @InjectRepository(user)
    private readonly userModel: Repository<user>,
  ) { }

  // Bcrypt
  async hashPassword(userPassword: string) {
    const salt = await bcrypt.genSalt(this.salt);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    return hashedPassword;
  }

  async comparePassword(userPassword: string, hashedPassword: string) {
    const validPassword = await bcrypt.compare(userPassword, hashedPassword);

    return validPassword;
  }

  //banUser
  async banUser(userId: string, isBlock: boolean) {
    const res = await this.userModel.update({userId: userId}, {userIsBlock: isBlock});
    return res;
  }

  //banUser
  async getUserById(userId: string) {
    const res = await this.userModel.findOne({userId: userId});
    return res;
  }

  //banUser
  async editUserById(userId: string, userInfor: EditUserDto) {
    let obj = {}
    for (const [key, value] of Object.entries(userInfor)) {
      if( value !== null && value !== "" ){
        obj[`${key}`] = value
      }
    }
    const res = await this.userModel.update({userId: userId}, obj);
    return res;
  }

  // Add user
  async insertUser(
      userName: string, 
      userEmail: string, 
      userPasswordHash: string, 
      userPhone: string, 
      userContactAddress: string,
      userSecret: string 
    ) {

    const newUser = await this.userModel.create({
      userId: uuidv4(),
      userName: userName,
      userEmail: userEmail,
      userPassword: userPasswordHash,
      userType: userEmail ? 'email': 'phone',
      userRole: 'user',
      userSecret: userSecret,
      userPhone: userPhone,
      userContactAddress: userContactAddress
    });

    const result = await this.userModel.save(newUser);
    return result;
  }

  // Get user
  async getUsers() {
    const users = await this.userModel.find({});
    const response = users.map(i => {
      let {userPassword ,...other} =  i;
      return other
    })
    return response;
  }

  async getSingleUser(userEmail: string) {
    const user = await this.findUser(userEmail)
    return user;
  }

  async checkExistUser(userEmail: string, userPhone: string) {
    const user = await this.userModel.findOne({userEmail: userEmail});
    const user1 = await this.userModel.findOne({userPhone: userPhone});
    let result = undefined;
    if(user !== undefined)
    {
      result = user;
    }
    else if(user1 !== undefined)
    {
      result = user1;
    }
    return result;
  }


  // Edit user
  async updatePasswordUser(userId: string, userPasswordHash: string) {
    const user = await this.findUserById(userId);

    user.userPassword = userPasswordHash

    await this.userModel.update({ userId: userId }, user);

    return user;
  }

  // Get user by amount
  async getUsersByAmount(perPage: number, page: number) {
    // const users = await this.userModel
    //   .createQueryBuilder('user')
    //   .limit(perPage)
    //   .skip((page - 1) * perPage).getMany();
    // return users;

    const users = await this.userModel.find({
      take: perPage,
      skip: (page - 1) * perPage
    })
    return users;
  }

  async updateUserRt(userId: string, rtHash: string) {
    const user = await this.findUserById(userId);

    user.userRefreshToken = rtHash

    await this.userModel.update({ userId: userId }, user);

    return user;
  }


  private async findUser(userEmail: string): Promise<user> {
    let user;

    try {
      user = await this.userModel.findOne({ userEmail: userEmail });
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }

    if (!user) {
      throw new NotFoundException('Could not find user.');
    }

    return user;
  }

  private async findUserById(id: string): Promise<user> {
    let user;

    try {
      user = await this.userModel.findOne({ userId: id });
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }

    if (!user) {
      throw new NotFoundException('Could not find user.');
    }

    return user;
  }
}