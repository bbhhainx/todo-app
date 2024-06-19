import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UserCreateDTO {
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserUpdateDTO extends UserCreateDTO {
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
