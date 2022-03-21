import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from '../users/users.service';
import ForgetPasswordDto from './dto/forgetPassword.dto';
import RegisterDto from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        private mailService: MailService
    ) { }

    async registerUser(registrationData: RegisterDto) {
        const hashedPassword = await this.usersService.hashPassword(registrationData.userPassword);

        try {
            const createdUser = await this.usersService.insertUser(
                registrationData.userName,
                registrationData.userEmail,
                hashedPassword
            );
            await this.mailService.sendUserConfirmation(registrationData, "hello");

            if (createdUser !== undefined)
                createdUser.userPassword = undefined;

            return createdUser;
        } catch (error) {
            if (error.code === 11000) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async validateUser(userEmail: string, pass: string): Promise<any> {
        const user = await this.usersService.getSingleUser(userEmail);
        console.log(user);

        const comparePassword = user !== null ? await this.usersService.comparePassword(pass, user.userPassword) : false;
        console.log(comparePassword);
        if (user && comparePassword) {
            return user;
        }
        return null;
    }

    async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
        // get user
        const user = await this.usersService.getSingleUser(forgetPasswordDto.userEmail);

        try {
            // hash password of user
            const hashPassword = await this.usersService.hashPassword(forgetPasswordDto.userPassword);

            // update password of user
            await this.usersService.updatePasswordUser(user._id.toString(), hashPassword);
        } catch (error) {
            console.error(error);
        }

    }

}