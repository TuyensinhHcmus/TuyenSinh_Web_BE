import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

import { User } from './users.model';



@Injectable()
export class UsersService {
  private salt = 10;
  constructor(@InjectModel('User') private readonly usesrModel: Model<User>) { }

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
    const newUser = new this.usesrModel({
      userName,
      userEmail,
      userPassword: userPasswordHash
    })

    const result = await newUser.save();

    return result;
  }

  // Get user
  async getUsers() {
    const users = await this.usesrModel.find().exec();
    return users;
  }

  async getSingleUser(userEmail: string) {
    const user = await this.usesrModel.findOne({ userEmail: userEmail }).exec();
    return user;
  }

  // Edit user
  async updatePasswordUser(userId: String, userPasswordHash: string) {
    await this.usesrModel.findOneAndUpdate(
      { _id: userId},
      { userPassword: userPasswordHash }
    );
  }

  // Get user by amount
  async getUsersByAmount(amount: number, sortCondition: number)
  {
    const condition = sortCondition === -1 ? sortCondition : 1;
    const users = await this.usesrModel.find().limit(amount).sort({
      userName: condition
    }).exec();
    return users;
  }

  async updateUserRt(userId: string, rtHash: string) {
    await this.usesrModel.findOneAndUpdate(
      { _id: userId },
      { refreshToken: rtHash }
    );
  }
}