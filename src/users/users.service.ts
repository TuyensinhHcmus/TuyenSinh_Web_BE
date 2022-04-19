import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

import { User } from './users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './users.entity';
import { Repository } from 'typeorm';
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

  // Add user
  async insertUser(userName: string, userEmail: string, userPasswordHash: string, userSecret: string) {

    const newUser = await this.userModel.create({
      userId: uuidv4(),
      userName: userName,
      userEmail: userEmail,
      userPassword: userPasswordHash,
      userType: userEmail ? 'email': 'phone',
      userRole: 'user',
      userSecret: userSecret
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

  async checkExistUser(userEmail: string) {
    const user = await this.userModel.findOne({userEmail: userEmail});
    return user;
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