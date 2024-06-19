import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { UserCreateDTO, UserUpdateDTO } from './user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get('user')
  async getAll() {
    return this.userService.users({});
  }

  /** tạo mới tài khoản người dùng */
  @Post('user')
  async signupUser(@Body() userData: UserCreateDTO): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
  /** cập nhật tài khoản */
  @Put('user/:id')
  async updateUser(
    @Body() userData: UserUpdateDTO,
    @Param() params: any,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { user_id: params.id },
      data: userData,
    });
  }
  /** xóa tài khoản */
  @Delete('user/:id')
  async deleteUser(
    @Body() userData: UserUpdateDTO,
    @Param() params: any,
  ): Promise<UserModel> {
    return this.userService.deleteUser({ user_id: params.id });
  }
}
