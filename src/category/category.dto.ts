import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryCreateDTO {
  @IsNotEmpty()
  @IsString()
  category_name: string;

  user_id: string;
  @IsString()
  description: string;
}
