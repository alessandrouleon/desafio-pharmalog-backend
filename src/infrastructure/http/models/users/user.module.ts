import { Module, OnModuleInit } from '@nestjs/common';
import { CreateUserAdminUseCase } from 'src/application/use-cases/users/create-user-admin.use-case';
import { CreateUserUseCase } from 'src/application/use-cases/users/create-user.use-case';
import { DeleteUserUseCase } from 'src/application/use-cases/users/delete-user.use-case';
import { GetUserUseCase } from 'src/application/use-cases/users/get-user.use-case';
import { LoginUserUseCase } from 'src/application/use-cases/users/login-use.use-case';
import { UpdateUserUseCase } from 'src/application/use-cases/users/update-user.use-case';
import { EncryptPassword } from 'src/infrastructure/crypto/encrypt-password';
import { UserRepository } from 'src/infrastructure/database/repositories/users/user.repository';
import { UserController } from '../../controllers/users/user.controller';

@Module({
    controllers: [UserController],
    exports: [
        LoginUserUseCase,
        {
            provide: 'IUserRepository',
            useClass: UserRepository,
        }
    ],
    providers: [
        CreateUserUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        GetUserUseCase,
        LoginUserUseCase,
        CreateUserAdminUseCase,
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
export class UserModule implements OnModuleInit {
    constructor(private readonly createUserAdminUseCase: CreateUserAdminUseCase) { }

    // Esse método será chamado quando o módulo for iniciado
    async onModuleInit() {
        await this.createUserAdminUseCase.createAdminUser();
    }
}