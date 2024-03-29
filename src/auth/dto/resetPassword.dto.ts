import { IsEmail, IsNotEmpty, IsString} from 'class-validator';
 
export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password is too week'})
  userPassword: string;
}
 
export default ResetPasswordDto;