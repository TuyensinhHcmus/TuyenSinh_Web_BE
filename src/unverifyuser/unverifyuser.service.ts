import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RegisterDto from 'src/auth/dto/register.dto';
import { Repository } from 'typeorm';
const { v4: uuidv4 } = require('uuid')
let otpGenerator = require('otp-generator')

import { unverifyuser } from './unverifyuser.entity';



@Injectable()
export class UnVerifyUsersService {
    constructor(
        @InjectRepository(unverifyuser)
        private readonly unVerifyUserRepo: Repository<unverifyuser>,
    ) { }

    // Add user
    async insertUser(userName: string, userEmail: string, userPasswordHash: string, userPhone: string, userContactAddress: string ,userSecret: string) {
        //console.log(userSecret)
        const newUser = await this.unVerifyUserRepo.create({
            userId: uuidv4(),
            userName: userName,
            userEmail: userEmail,
            userPassword: userPasswordHash,
            userPhone: userPhone,
            userContactAddress: userContactAddress,
            userSecret: userSecret,
            userType: "email"
        });

        const result = await this.unVerifyUserRepo.save(newUser);
        return result;
    }

    async getSingleUser(userId: string) {
        const user = this.unVerifyUserRepo.findOne({ userId: userId })
        return user;
    }

    async refreshOTP() {
        const OTP = otpGenerator.generate(6, {
            alphabets: false,
            upperCase: false,
            specialChars: false
        });

        return OTP;
    }

    async updateUnverifyUser(userId: string, new_OTP: string) {
        const user = await this.unVerifyUserRepo.findOne({ userId: userId })
        let time = Date.now() + 60000;
        const time_1 = Math.floor(time / 1000000);
        time = time - time_1 * 1000000;

        user.userSecret = new_OTP + '-' + time;

        await this.unVerifyUserRepo.update({ userId: userId }, user);

        const time_2 = time + Math.floor(Date.now() / 1000000) * 1000000

        
        
        return {
            OTP:new_OTP, 
            time: time_2,
            user: user
        }
    }
}