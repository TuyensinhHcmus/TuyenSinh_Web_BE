import { IsEmail, IsNotEmpty, IsString} from 'class-validator';
 
export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password is too week'})
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password is too week'})
  newPassword: string;
}
 
export default ChangePasswordDto;