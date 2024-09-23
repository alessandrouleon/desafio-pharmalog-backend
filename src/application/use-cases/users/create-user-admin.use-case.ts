import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/users/user.entity';
import { IUserRepository } from 'src/domain/repositories/users/user-repository.interface';
import { ICryptoPassword } from 'src/infrastructure/crypto/crypto-password.interface';

@Injectable()
export class CreateUserAdminUseCase {
    @Inject('IUserRepository')
    private userRepository: IUserRepository

    @Inject('ICryptoPassword')
    private cryptoPassword: ICryptoPassword

    // Função para criar o usuário admin caso não existam usuários
    async createAdminUser(): Promise<User> {

        const adminUser = {
            name: 'Administrador',
            username: 'admin',
            email: 'admin@gmail.com',
            password: "Admin@123",
            isAdmin: true,
        };

        const userCount = await this.userRepository.findByUsername(adminUser.username)

        // Se não houver nenhum usuário, cria o admin
        if (!userCount) {
            const user = User.createUser(adminUser);

            const hashPassword = await this.cryptoPassword.hashPassword(adminUser.password);
            user.password = hashPassword;

            const createUser = await this.userRepository.create(user);
            return createUser;
        }
    }
}
