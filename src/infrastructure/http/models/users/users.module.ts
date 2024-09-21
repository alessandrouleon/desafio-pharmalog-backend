import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/use-cases/users/create-user.use-case';
import { EncryptPassword } from 'src/infrastructure/crypto/encrypt-password';
import { UserRepository } from 'src/infrastructure/database/repositories/users/user.repository';
import { UserController } from '../../controllers/users.controller';

@Module({
    controllers: [UserController],
    exports: [
        // LoginUserUseCase,
        // {
        //     provide: 'IUserRepository',
        //     useClass: UserRepository,
        // },
        // {
        //     provide: 'ICryptoPassword',
        //     useClass: EncryptPassword,
        // },
    ],
    providers: [
        CreateUserUseCase,
        {
            provide: 'IUserRepository',
            useClass: UserRepository,
        },
        {
            provide: 'ICryptoPassword',
            useClass: EncryptPassword,
        },
    ],
    imports: [],
})
export class UserModule { }
