import { IsEmail, IsNotEmpty, IsString} from 'class-validator';
 
export class ForgetPasswordDto {
  @IsString()
  @IsNotEmpty()
  userEmail: string;
}
 
export default ForgetPasswordDto;