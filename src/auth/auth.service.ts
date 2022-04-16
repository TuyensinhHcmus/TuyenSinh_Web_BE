import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import ForgetPasswordDto from './dto/forgetPassword.dto';
import * as bcrypt from 'bcrypt'
import RegisterDto from './dto/register.dto';
import { JwtPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, 
        private readonly jwtService: JwtService,
        private mailService: MailService) { }

    async hashData(data: string) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(data, salt);
    }

    async getTokens(userId: string, userEmail: string) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                {
                    userId,
                    userEmail,
                },
                {
                    secret: "topSecret51",
                    expiresIn: 60 * 15
                }
            ),
            this.jwtService.signAsync(
                {
                    userId,
                    userEmail,
                },
                {
                    secret: "rt-topSecret51",
                    expiresIn: 60 * 60 * 24 * 7
                }
            ),

        ])

        return {
            accessToken: at,
            refreshToken: rt,
        }

        // const accessToken = await this.jwtService.
    }

    async updateRefreshToken(userId: string, rt: string) {
        const hash = await this.hashData(rt);
        await this.usersService.updateUserRt(userId, hash);
    }

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


            const tokens = await this.getTokens(createdUser.userId, createdUser.userEmail);
            await this.updateRefreshToken(createdUser.userId, tokens.refreshToken)
            //console.log(tokens, createdUser);
            return tokens;
        } catch (error) {
            //console.log(error)
            if (error.code === 'ER_DUP_ENTRY') {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async logOut(userId: string) {
        await this.usersService.updateUserRt(userId, '')
    }

    async refreshToken(userId: string, userEmail: string): Promise<any> {
        const tokens = await this.getTokens(userId, userEmail);
        await this.updateRefreshToken(userId, tokens.refreshToken)
        return tokens
    }
    
    googleLogin(req) {
        if (!req.user) {
          return 'No user from google'
        }
    
        return {
          message: 'User information from google',
          user: req.user
        }
      }

    async validateUser(userEmail: string, pass: string): Promise<any> {
        const user = await this.usersService.getSingleUser(userEmail);
        console.log(user);

        const comparePassword = user !== null ? await this.usersService.comparePassword(pass, user.userPassword) : false;
        console.log(comparePassword);
        if (user && comparePassword) {
            const tokens = await this.getTokens(user.userId, user.userEmail);
            await this.updateRefreshToken(user.userId, tokens.refreshToken)
            return {'user':user,'token': tokens};
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
            await this.usersService.updatePasswordUser(user.userId.toString(), hashPassword);
        } catch (error) {
            console.error(error);
        }

    }

}