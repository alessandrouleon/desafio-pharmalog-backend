import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EncryptPassword } from 'src/infrastructure/crypto/encrypt-password';
import { UserModule } from 'src/infrastructure/http/models/users/user.module';
import { jwtConstants } from '../constants/auth-user.secret';
import { AuthController } from '../controllers/auth.controller';
import { AuthGuard } from '../guard/auth.guard';
import { AuthUserService } from '../services/auth-user.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1D' },
    }),
  ],
  providers: [
    AuthUserService,
    AuthGuard,
    {
      provide: 'ICryptoPassword',
      useClass: EncryptPassword,
    },
  ],
  controllers: [AuthController],
  exports: [AuthUserService],
})
export class AuthModule { }
