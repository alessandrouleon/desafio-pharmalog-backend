import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/use-cases/users/create-user.use-case';
import { UpdateUserUseCase } from 'src/application/use-cases/users/update-user.use-case';
import { EncryptPassword } from 'src/infrastructure/crypto/encrypt-password';
import { UserRepository } from 'src/infrastructure/database/repositories/users/user.repository';
import { UserController } from '../../controllers/users.controller';

@Module({
    controllers: [UserController],
    exports: [],
    providers: [
        CreateUserUseCase,
        UpdateUserUseCase,
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
