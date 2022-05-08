import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import ForgetPasswordDto from './dto/forgetPassword.dto';
import * as bcrypt from 'bcrypt'
import RegisterDto from './dto/register.dto';
import { JwtPayload } from './token-payload.interface';
let otpGenerator = require('otp-generator')
import { UnVerifyUsersService } from 'src/unverifyuser/unverifyuser.service';


@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private mailService: MailService,
        private readonly unVerifyUsersService: UnVerifyUsersService) { }

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
        //Check user is exist in database user
        const isExistUser = await this.usersService.checkExistUser(registrationData.userEmail);
 
        if (isExistUser === undefined) {
            // Generate OTP and time expired for user
            const OTP = otpGenerator.generate(6, {
                alphabets: false,
                upperCase: false,
                specialChars: false
            });
            //console.log("OTP:", OTP)
            let time = Date.now() + 60000;
            const time_1 = Math.floor(time / 1000000);
            //console.log(time_1)
            time = time - time_1 * 1000000;
            //console.log("Time", time)

            // Save information of user into unverifieduser database
            const hashedPassword = await this.usersService.hashPassword(registrationData.userPassword);
            const verifyUser = await this.unVerifyUsersService.insertUser(
                registrationData.userName,
                registrationData.userEmail,
                hashedPassword,
                registrationData.userPhone,
                registrationData.userContactAddress,
                OTP + '-' + time
            )


            // Send mail
            await this.mailService.sendUserConfirmation(registrationData, OTP);

            return {
                user: verifyUser.userId,
                expired: (time + Math.floor(Date.now() / 1000000) * 1000000) - Date.now()
            }
        }
        else {
            throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
        }

        // const hashedPassword = await this.usersService.hashPassword(registrationData.userPassword);
        // try {
        //     const createdUser = await this.usersService.insertUser(
        //         registrationData.userName,
        //         registrationData.userEmail,
        //         hashedPassword
        //     );
        //     await this.mailService.sendUserConfirmation(registrationData, "hello");

        //     if (createdUser !== undefined)
        //         createdUser.userPassword = undefined;


        //     const tokens = await this.getTokens(createdUser.userId, createdUser.userEmail);
        //     await this.updateRefreshToken(createdUser.userId, tokens.refreshToken)
        //     //console.log(tokens, createdUser);
        //     return tokens;
        // } catch (error) {
        //     //console.log(error)
        //     if (error.code === 'ER_DUP_ENTRY') {
        //         throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
        //     }
        //     throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        // }
    }

    async verifyOTP(otp: string, userId: string) {
        try {
            // Get user from unverifyuser database
            let user = await this.unVerifyUsersService.getSingleUser(userId)

            const [OTP, time] = user.userSecret.split('-');

            const time_1 = parseInt(time) + Math.floor(Date.now() / 1000000) * 1000000
            const verify = () => {
                if (OTP === otp && time_1 >= Date.now()) {
                    return true;
                }
                else {
                    return false;
                }
            }
            console.log("before insert")
            if (verify()) {
                //transfer database of user from unVerifyUser to user
                const verifiedUser = await this.usersService.insertUser(
                    user.userName,
                    user.userEmail,
                    user.userPassword,
                    user.userPhone,
                    user.userContactAddress,
                    user.userSecret
                )
                console.log("after insert")
                const tokens = await this.getTokens(verifiedUser.userId, verifiedUser.userEmail);
                await this.updateRefreshToken(verifiedUser.userId, tokens.refreshToken)

                // return {
                //     verify: verify(),
                //     message: "Đã xác thực thành công !",
                //     user: verifiedUser,
                //     tokens: tokens
                // }
                user = await this.unVerifyUsersService.getSingleUser(userId)
                return {
                    user: user,
                    token: tokens
                };
            }
            return {
                verify: verify(),
                expire: time_1 - Date.now()
            };
        }
        catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async refreshOTP(userId: string) {
        try {
            // Generate new OTP
            const new_OTP = await this.unVerifyUsersService.refreshOTP();

            // Update unverifyuser
            const updateData = await this.unVerifyUsersService.updateUnverifyUser(userId, new_OTP);
            const OTP = updateData.OTP;
            const time = updateData.time;
            const user = updateData.user;
            // Send mail
            const registerData = new RegisterDto();

            registerData.userEmail = user.userEmail;
            registerData.userName = user.userName;
            registerData.userPassword = user.userPassword;
            registerData.userPhone = user.userPhone;
            registerData.userContactAddress = user.userContactAddress;

            await this.mailService.sendUserConfirmation(registerData, OTP);

            return {
                expire: time - Date.now()
            }
        }
        catch (error) {
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
        if(user.userIsBlock)
        {
            throw new HttpException("User is banned", 403)
        }

        const comparePassword = user !== null ? await this.usersService.comparePassword(pass, user.userPassword) : false;
        console.log(comparePassword);
        if (user && comparePassword) {
            const tokens = await this.getTokens(user.userId, user.userEmail);
            await this.updateRefreshToken(user.userId, tokens.refreshToken)
            return { 'user': user, 'token': tokens };
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