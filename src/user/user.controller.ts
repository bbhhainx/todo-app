import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { IResponse } from 'src/interface/response';
import { UserService } from './user.service';
import { UserCreateDTO } from './user.dto';
import { User as UserModel } from '@prisma/client';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** lấy tất cả tài khoản */
  @Get('user')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAllUser(@Res() res: IResponse): Promise<any> {
    const user = await this.userService.users({});
    return user;
  }

  /** tạo mới tài khoản người dùng */
  @Post('user')
  @UseGuards(AuthGuard)
  async signupUser(
    @Res() res: IResponse,
    @Body() userData: UserCreateDTO,
  ): Promise<void> {
    try {
      const user = await this.userService.createUser(userData);

      if (!user) throw 'Tạo tài khoản mới thất bại';
      res.ok(user); // Trả về response thành công với user
    } catch (error) {
      res.err(error); // Trả về response lỗi với thông báo lỗi
    }
  }
  /** cập nhật tài khoản */
  @Put('user/:id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Res() res: IResponse,
    @Body() userData: UserCreateDTO,
    @Param() params: { id: string },
  ): Promise<void> {
    try {
      const user = await this.userService.updateUser({
        where: { user_id: params.id },
        data: userData,
      });
      res.ok(user);
    } catch (error) {
      res.err(error);
    }
  }
  /** xóa tài khoản */
  @Delete('user/:id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param() params: { id: string }): Promise<UserModel> {
    const user = await this.userService.deleteUser({ user_id: params.id });
    return user;
  }
}
