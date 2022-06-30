import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

import { User } from './users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './users.entity';
import { Between, MoreThan, Repository } from 'typeorm';
import { EditUserDto } from './dto/edit-user-dto';
import { string } from '@hapi/joi';
import ChangePasswordDto from './dto/change-password.dto';
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
    const res = await this.userModel.update({ userId: userId }, { userIsBlock: isBlock });
    return res;
  }

  //banUser
  async getUserById(userId: string) {
    const res = await this.userModel.findOne({ userId: userId });
    return res;
  }

  //banUser
  async editUserById(userId: string, userInfor: EditUserDto) {
    let obj = {}
    for (const [key, value] of Object.entries(userInfor)) {
      if (value !== null && value !== "") {
        obj[`${key}`] = value
      }
    }
    const res = await this.userModel.update({ userId: userId }, obj);
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
    try {
      const newUser = await this.userModel.create({
        userId: uuidv4(),
        userName: userName,
        userEmail: userEmail,
        userPassword: userPasswordHash,
        userType: userEmail ? 'email' : 'phone',
        userRole: 'user',
        userSecret: userSecret,
        userPhone: userPhone ? userPhone : uuidv4(),
        userContactAddress: userContactAddress,
        // Default value
        userIsBlock: false,
        userRefreshToken: "",
        userAvatar: "",
        userGender: "",
        userEthnicity: "",
        userNationality: "",
        userBirthday: new Date(),
        userBirthplace: "",
        userProvinceResidence: "",
        userDistrictResidence: "",
        userAddress12: "",
        userSchool12: "",
        userAddress11: "",
        userSchool11: "",
        userAddress10: "",
        userSchool10: "",
        userIdentityNumber: "",
        userWardResidence: "",
        userStreetResidence: "",
        currentTokenDevice: "",
        oldTokenDevice: "",
        userCandicateId: "",
        userDateCreate: new Date()
      });

      const result = await this.userModel.save(newUser);
      return result;
    } catch (error) {
      console.log(error)
      throw new NotImplementedException("Không thể thêm user vào database do trường email, number phone hoặc userCandidateId bị trùng")
    }
  }

  // Get user
  public async getUsers() {
    const users = await this.userModel.find({});
    const response = users.map(i => {
      let { userPassword, ...other } = i;
      return other
    })
    return response;
  }

  async getSingleUser(userEmail: string) {
    const user = await this.findUser(userEmail)
    return user;
  }

  async checkExistUser(userEmail: string, userPhone: string) {
    const user = await this.userModel.findOne({ userEmail: userEmail });
    const user1 = await this.userModel.findOne({ userPhone: userPhone });
    let result = undefined;
    if (user !== undefined) {
      result = user;
    }
    else if (user1 !== undefined) {
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

  // Change password
  async changePassword(changePasswordDto: ChangePasswordDto, userId: string) {
    const { oldPassword, newPassword } = changePasswordDto;

    // Check oldPassword is true in database
    let user = await this.userModel.findOne({ userId: userId });
    const password = user.userPassword;
    const isPassword = await this.comparePassword(oldPassword, password);

    // Update password
    if (isPassword) {
      // Hash password
      const hashPassword = await this.hashPassword(newPassword);

      // Change password
      user.userPassword = hashPassword;
      await this.userModel.update({ userId: userId }, user);

      return {
        message: "Đã cập nhật thành công!"
      }
    }

    throw new BadRequestException("Mật khẩu cũ không đúng!")

    // return {
    //   message: "Mật khẩu cũ không đúng!"
    // };
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
      throw new NotFoundException('Không tìm thấy người dùng với email này.');
    }

    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng với email này.');
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

  async updateDeviceToken(userId: string, deviceToken: string) {
    const user = await this.findUserById(userId);

    user.currentTokenDevice = deviceToken;

    await this.userModel.update({ userId: userId }, user);

    return user;
  }

  getFirstDayOfMonth(year: number, month: number, date: number = 1) {
    return new Date(year, month, date);
  }

  async statisticUser() {

    const date = new Date();
    const firstDayCurrentMonth = this.getFirstDayOfMonth(
      date.getFullYear(),
      date.getMonth(),
    );

    const firstDayLastMonth = this.getFirstDayOfMonth(
      date.getFullYear(),
      date.getMonth() > 1 ? date.getMonth() - 1 : 12,
    );

    const curDayLastMonth = this.getFirstDayOfMonth(
      date.getFullYear(),
      date.getMonth() > 1 ? date.getMonth() - 1 : 12,
      date.getDate()
    );

    // console.log("firstdate", firstDayCurrentMonth, "lastmonth", firstDayLastMonth, "curDayLastMonth", curDayLastMonth, "abc",
    //   date.getFullYear(), date.getDate(), date.getMonth()
    // );


    const numNew = await this.userModel.count({
      where: {
        newsDateCreate: MoreThan(firstDayCurrentMonth)
      }
    })

    const numOld = await this.userModel.count({
      where: {
        newsDateCreate: Between(firstDayLastMonth, curDayLastMonth),
      }
    })

    console.log("numNew", numNew, "numOld", numOld);

    let percentVsLastMonth = 0;
    let increase = true;
    if (numNew > numOld) {
      percentVsLastMonth = Math.round(((numNew - numOld) / numOld) * 100);
    }
    if (numNew < numOld) {
      increase = false
      percentVsLastMonth = Math.round(((numOld - numNew) / numOld) * 100);
    }

    return {
      amount: numNew,
      percentVsLastMonth,
      increase
    }

  }

  // Add user by admin
  async addUserByAdmin(
    userName: string,
    userEmail: string,
    userPasswordHash: string,
    userRole: string,
    //userContactAddress: string,
    //userSecret: string
  ) {
    try {
      const newUser = await this.userModel.create({
        userId: uuidv4(),
        userName: userName,
        userEmail: userEmail,
        userPassword: userPasswordHash,
        userType: userEmail ? 'email' : 'phone',
        userRole: userRole,
        //userSecret: userSecret,
        userPhone: uuidv4(),
        //userContactAddress: userContactAddress

        // Default value
        userSecret: "",
        userContactAddress: "",
        userIsBlock: false,
        userRefreshToken: "",
        userAvatar: "",
        userGender: "",
        userEthnicity: "",
        userNationality: "",
        userBirthday: new Date(),
        userBirthplace: "",
        userProvinceResidence: "",
        userDistrictResidence: "",
        userAddress12: "",
        userSchool12: "",
        userAddress11: "",
        userSchool11: "",
        userAddress10: "",
        userSchool10: "",
        userIdentityNumber: "",
        userWardResidence: "",
        userStreetResidence: "",
        currentTokenDevice: "",
        oldTokenDevice: "",
        userCandicateId: "",
        userDateCreate: new Date()
      });
      console.log(newUser)
      const result = await this.userModel.save(newUser);
      return result;
    } catch (error) {
      console.log(error)
      throw new HttpException('User with that email or number phone already exists', HttpStatus.BAD_REQUEST);
    }
  }
}