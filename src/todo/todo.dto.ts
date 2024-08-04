import { STATUS } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class TodoCreateDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(STATUS)
  status: STATUS;
  
  user_id: string;
}
