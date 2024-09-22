import { Module } from '@nestjs/common';
import { UserModule } from './models/users/user.module';

import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/application/auth/guard/auth.guard';
import { AuthModule } from 'src/application/auth/model/auth.module';
import { ProductModule } from './models/products/product.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    ConfigModule.forRoot(),
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule { }
