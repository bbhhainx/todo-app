import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryCreateDTO {
  @IsNotEmpty()
  @IsString()
  category_name: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsString()
  description: string;
}
