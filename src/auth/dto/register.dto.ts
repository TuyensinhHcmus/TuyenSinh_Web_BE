import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
 
export class RegisterDto {
  @IsEmail()
  userEmail: string;
 
  @IsString()
  @IsNotEmpty()
  userName: string;
 
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  userPassword: string;
}
 
export default RegisterDto;