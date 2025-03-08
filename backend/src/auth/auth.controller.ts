import {
  Controller,
  Post,
  Body,
  UseGuards,
  Response,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { Public } from 'src/core/decorators/public.decorator';
import { ICurrentUser } from 'src/core/interfaces/current-user.interface';
import { Cookie } from 'src/core/decorators/cookie.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    await this.authService.register(registerAuthDto);
    return 'ok';
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @CurrentUser() user: ICurrentUser,
    @Response({ passthrough: true }) res,
  ) {
    return this.authService.login(user, res);
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Response({ passthrough: true }) res) {
    this.authService.logout(res);
    return 'ok';
  }

  @HttpCode(200)
  @Public()
  @Post('refresh')
  async refresh(
    @Cookie('refresh_token') refreshToken,
    @Response({ passthrough: true }) res,
  ) {
    if (!refreshToken) throw new UnauthorizedException();
    return this.authService.refresh(refreshToken, res);
  }
}
