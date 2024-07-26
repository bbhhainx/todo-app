import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Res } from 'src/decorator/response.decorator';
import { RefreshJwtGuard } from './refreshJwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signInDto: Record<string, any>) {
    return this.authService.signUp(signInDto.username, signInDto.password);
  }
  @UseGuards(RefreshJwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  refreshToken(@Request() user: any) {
    return this.authService.refreshToken(user);
  }
}
