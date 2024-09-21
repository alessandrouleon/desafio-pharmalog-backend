import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/application/dtos/users/create-user.dto";
import { User } from "src/domain/entities/users/user.entity";
import { IUserRepository } from "src/domain/repositories/users/user-repository.interface";
import { ICryptoPassword } from "src/infrastructure/crypto/crypto-password.interface";
import { UserMessageHelper } from "src/utils/message.helps";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('IUserRepository')
        private userRepository: IUserRepository,

        @Inject('ICryptoPassword')
        private cryptoPassword: ICryptoPassword
    ) { }

    async execute(createUserDto: CreateUserDto): Promise<User> {

        const user = User.createUser(createUserDto);

        const [userName, userEmail] = await Promise.all([
            this.userRepository.findByUsername(createUserDto.username),
            this.userRepository.findByEmail(createUserDto.email)
        ])

        if (userName) {
            throw new HttpException(
                UserMessageHelper.EXIST_USERNAME,
                HttpStatus.BAD_REQUEST,
            );
        }

        if (userEmail) {
            throw new HttpException(
                UserMessageHelper.EXIST_EMAIL,
                HttpStatus.BAD_REQUEST,
            );
        }

        const hashPassword = await this.cryptoPassword.hashPassword(createUserDto.password);
        user.password = hashPassword;

        const createUser = await this.userRepository.create(user);

        return createUser;
    }
}
