import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginUserUseCase } from 'src/application/use-cases/users/login-use.use-case';
import { ICryptoPassword } from 'src/infrastructure/crypto/crypto-password.interface';

@Injectable()
export class AuthUserService {
  constructor(
    private loginUseUseCase: LoginUserUseCase,
    private jwtService: JwtService,
    @Inject('ICryptoPassword')
    private cryptoPassword: ICryptoPassword
  ) { }
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.loginUseUseCase.authUsername(username);
    const isPasswordValid = await this.cryptoPassword.comparePassword(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = {
      username: user.username,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
