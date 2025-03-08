import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginAuthDto } from '../dto/login-auto.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    /**
     * Custom validate argument names
     */
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  /**
   * For the local-strategy, Passport expects a validate() method with the following signature: validate(username: string, password:string): any
   */
  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(
      new LoginAuthDto(email, password),
    );
    return user;
  }
}
