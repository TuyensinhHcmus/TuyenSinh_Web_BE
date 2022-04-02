import { IsEmail, IsNotEmpty, IsString} from 'class-validator';
 
export class ForgetPasswordDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  @IsNotEmpty()
  userPassword: string;
}
 
export default ForgetPasswordDto;