import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const { v4: uuidv4 } = require('uuid')

import { unverifyuser } from './unverifyuser.entity';



@Injectable()
export class UnVerifyUsersService {
    constructor(
        @InjectRepository(unverifyuser)
        private readonly unVerifyUserRepo: Repository<unverifyuser>,
    ) { }

    // Add user
    async insertUser(userName: string, userEmail: string, userPasswordHash: string, userSecret: string) {
        //console.log(userSecret)
        const newUser = await this.unVerifyUserRepo.create({
            userId: uuidv4(),
            userName: userName,
            userEmail: userEmail,
            userPassword: userPasswordHash,
            userSecret: userSecret
        });

        const result = await this.unVerifyUserRepo.save(newUser);
        return result;
    }

    async getSingleUser(userId: string){
        const user = this.unVerifyUserRepo.findOne({userId: userId})
        return user;
    }
}