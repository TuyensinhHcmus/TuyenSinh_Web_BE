import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

import { User } from './users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './users.entity';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';


@Injectable()
export class UsersService {
  private salt = 10;
  constructor(
    @InjectRepository(user)
    private readonly usesrModel: Repository<user>,
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
  async insertUser(userName: string, userEmail: string, userPasswordHash: string) {

    const newUser = await this.usesrModel.create({
      userId: uuid(),
      userName: userName,
      userEmail: userEmail,
      userPassword: userPasswordHash,
    });

    const result = await this.usesrModel.save(newUser);

    return result;
  }

  // Get user
  async getUsers() {
    const users = await this.usesrModel.find({});
    return users;
  }

  async getSingleUser(userEmail: string) {
    const user = await this.findUser(userEmail)
    return user;
  }


  // Edit user
  async updatePasswordUser(userId: string, userPasswordHash: string) {
    const user = await this.findUserById(userId);

    user.userPassword = userPasswordHash

    await this.usesrModel.update({ userId: userId }, user);

    return user;
  }

  // Get user by amount
  async getUsersByAmount(amount: number, sortCondition: number) {
    const condition = sortCondition === -1 ? sortCondition : 1;
    const users = await this.usesrModel.find({
      take: amount,
      order: {
        userName: condition
      }
    })
    return users;
  }

  async updateUserRt(userId: string, rtHash: string) {
    const user = await this.findUserById(userId);

    user.userRefreshToken = rtHash

    await this.usesrModel.update({ userId: userId }, user);

    return user;
  }


  private async findUser(userEmail: string): Promise<user> {
    let user;

    try {
      user = await this.usesrModel.findOne({ userEmail: userEmail });
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
      user = await this.usesrModel.findOne({ userId: id });
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }

    if (!user) {
      throw new NotFoundException('Could not find user.');
    }

    return user;
  }
}