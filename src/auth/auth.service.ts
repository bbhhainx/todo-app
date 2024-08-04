import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new BadRequestException('Tài khoảng mật khẩu không chính xác');
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new BadRequestException('Tài khoảng mật khẩu không chính xác');
    }
    const payload = { sub: user.user_id, username: user.user_name };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }
  async signUp(username: string, pass: string): Promise<any> {
    const existedUser = await this.userService.findOne(username);
    if (existedUser) {
      throw new ConflictException('Tài khoản đã tồn tại');
    }

    const saltOrRounds = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(pass, saltOrRounds);

    let data = {
      user_name: username,
      password: hashPass,
    };

    const user = await this.userService.createUser(data);
    return { message: 'Tạo tài khoản thành công' };
  }

  async refreshToken(user: any): Promise<any> {
    try {
      // const { sub, username } = await this.jwtService.verify(refreshToken);

      // const payload = { sub, username };
      const payload = { sub: user.user_id, username: user.user_name };
      return {
        access_token: await this.jwtService.signAsync(payload),
        refresh_token: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
        }),
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
