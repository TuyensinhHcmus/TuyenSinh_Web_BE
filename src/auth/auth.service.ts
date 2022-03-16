import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import RegisterDto from './dto/register.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

    async registerUser(registrationData: RegisterDto) {
        const hashedPassword = await this.usersService.hashPassword(registrationData.userPassword);

        try {
            const createdUser = await this.usersService.insertUser(
                registrationData.userName,
                registrationData.userEmail,
                hashedPassword
            );
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

    async validateUser(userEmail: string, pass: string): Promise<{ accessToken: string }> {
        const user = await this.usersService.getSingleUser(userEmail);
        const comparePassword = user !== null ? await this.usersService.comparePassword(pass, user.userPassword) : false;
        if (user && comparePassword) {
            const { userEmail, userPassword } = user;
            const payload: JwtPayload = { userEmail };
            const accessToken: string = await this.jwtService.sign(payload)
            return { accessToken };
        }
        return null;
    }
}