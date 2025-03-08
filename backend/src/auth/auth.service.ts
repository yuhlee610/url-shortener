import {
  UnauthorizedException,
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UsersService } from 'src/users/users.service';
import { StringUtil } from 'src/core/utils/strings.util';
import { LoginAuthDto } from './dto/login-auto.dto';
import { JwtService } from '@nestjs/jwt';
import { ICurrentUser } from 'src/core/interfaces/current-user.interface';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  register(registerAuthDto: RegisterAuthDto) {
    registerAuthDto.password = StringUtil.encryptSHA256(
      registerAuthDto.password,
    );
    return this.usersService.create(registerAuthDto);
  }

  async validateUser(loginAuthDto: LoginAuthDto) {
    loginAuthDto.password = StringUtil.encryptSHA256(loginAuthDto.password);
    const user =
      await this.usersService.findOneByEmailAndPassword(loginAuthDto);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { password, refreshToken, ...rest } = user;
    return rest;
  }

  async login(user: ICurrentUser, res: Response) {
    const { id, ...rest } = user;

    const payload = { ...rest, sub: id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.createRefreshToken(payload);
    await this.usersService.updateRefreshToken(id, refreshToken);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('REFRESH_TOKEN_EXPIRE_TIME')),
    });

    return {
      access_token: accessToken,
      user,
    };
  }

  logout(res: Response) {
    res.clearCookie('refresh_token');
  }

  async refresh(refreshToken: string, res: Response) {
    this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
    });

    const user = await this.usersService.findOneByRefreshToken(refreshToken);

    if (!user) {
      throw new BadRequestException();
    }

    const { password, refreshToken: _, ...currentUser } = user;

    return this.login(currentUser, res);
  }

  createRefreshToken(payload: object) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRE_TIME'),
    });

    return refreshToken;
  }
}
