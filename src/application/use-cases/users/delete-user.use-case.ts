import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/users/user.entity';
import { IUserRepository } from 'src/domain/repositories/users/user-repository.interface';
import { UserMessageHelper } from 'src/utils/message.helps';

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @Inject('IUserRepository')
        private userRepository: IUserRepository,
    ) { }

    async execute(id: string): Promise<void> {

        const existsUser = await this.userRepository.findById(id);

        if (!existsUser) {
            throw new HttpException(
                UserMessageHelper.ID_NOT_EXIST_FOR_DELETED,
                HttpStatus.BAD_REQUEST,
            );
        }

        const deleteUser = User.deleteUser(existsUser);

        await this.userRepository.delete(id, { ...deleteUser });
    }
}
