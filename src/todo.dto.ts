import { STATUS } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class TodoCreateDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(STATUS)
  status: STATUS;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}
