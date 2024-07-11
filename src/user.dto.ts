import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UserCreateDTO {
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
