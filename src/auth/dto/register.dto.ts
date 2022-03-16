import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
 
export class RegisterDto {
  @IsEmail()
  userEmail: string;
 
  @IsString()
  @IsNotEmpty()
  userName: string;
 
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password is too week'})
  userPassword: string;
}
 
export default RegisterDto;