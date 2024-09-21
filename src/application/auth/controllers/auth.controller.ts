import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '../public';
import { AuthUserService } from '../services/auth-user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUserService: AuthUserService,

  ) { }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signInUser(@Body() signInDto: Record<string, any>) {
    return this.authUserService.signIn(signInDto.username, signInDto.password);
  }


}
