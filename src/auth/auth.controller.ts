import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './local.auth.guard';
import RegisterDto from './dto/register.dto';
import ForgetPasswordDto from './dto/forgetPassword.dto';
import { AuthGuard } from '@nestjs/passport';
import { AtGuard, RtGuard, GgGuard } from 'src/common/guards';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }


  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.registerUser(registrationData);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async logIn(@Req() req: RequestWithUser) {
    const user = req.user;
    user.userPassword = undefined;
    return user;
  }

  @Post('forget-password')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto)
  {
    return this.authService.forgetPassword(forgetPasswordDto);
  }
  

  @Post('logout')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  async logOut(@Req() req: RequestWithUser) {
    // console.log('req.user0', req.user);
    return await this.authService.logOut(req.user.userId)
  }

  @Post('refresh')
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req: RequestWithUser) {
    // console.log("req", req.user);
    return await this.authService.refreshToken(req.user.userId, req.user.userEmail)
  }

  @Get('google')
  @UseGuards(GgGuard)
  async googleAuth(@Req() req) {
    console.log('req gg', req);
  }
  
  @Get('redirect')
  @UseGuards(GgGuard)
  googleAuthRedirect(@Req() req) {
    console.log('req gg', req);
    return this.authService.googleLogin(req)
  }

  @Get('a')
  @UseGuards(GgGuard)
  testgg(@Req() req) {
    console.log('req gg', req);
    // return this.authService.googleLogin(req)
  }

  @Post('test')
  test(@Req() req) {

  }
}