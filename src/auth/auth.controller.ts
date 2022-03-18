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
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
 
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


  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async logOut(@Req() req: RequestWithUser) {
    console.log('req.user0', req.user);

    
    await this.authService.logOut(req.user._id)
  }

  @Post('test')
  @UseGuards(AuthGuard('jwt'))
  test(@Req() req)
  {
    
  }
}