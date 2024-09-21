import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UpdateUserDto } from "src/application/dtos/users/update-user.dto";
import { Email } from "src/domain/entities/users/email.validator";
import { Password } from "src/domain/entities/users/password.validator";
import { User } from "src/domain/entities/users/user.entity";
import { IUserRepository } from "src/domain/repositories/users/user-repository.interface";
import { ICryptoPassword } from "src/infrastructure/crypto/crypto-password.interface";
import { UserMessageHelper } from "src/utils/message.helps";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject('IUserRepository')
        private userRepository: IUserRepository,

        @Inject('ICryptoPassword')
        private cryptoPassword: ICryptoPassword
    ) { }

    async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const userId = await this.userRepository.findById(id);

        if (!userId) {
            throw new HttpException(
                UserMessageHelper.ID_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }

        if (updateUserDto.username && userId.username !== updateUserDto.username) {
            const getUsername = await this.userRepository.findByUsername(updateUserDto.username);
            if (getUsername) {
                throw new HttpException(
                    UserMessageHelper.EXIST_USERNAME,
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        if (updateUserDto.email && userId.email !== updateUserDto.email) {
            const getEmail = await this.userRepository.findByEmail(updateUserDto.email);
            if (getEmail) {
                throw new HttpException(
                    UserMessageHelper.EXIST_EMAIL,
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        const updatedData: User = {
            name: updateUserDto.name || userId.name,
            username: updateUserDto.username || userId.username,
            email: updateUserDto.email ? new Email(updateUserDto.email).getValue() : userId.email,
            password: updateUserDto.password ? await this.cryptoPassword.hashPassword(new Password(updateUserDto.password).getValue()) : userId.password,
            isAdmin: updateUserDto.isAdmin,
        };

        const user = User.updateUser(updatedData);
        const updateUser = await this.userRepository.update(id, user);
        return updateUser;

    }
}