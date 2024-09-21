import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { User } from 'src/domain/entities/users/user.entity';
import { IUserRepository } from 'src/domain/repositories/users/user-repository.interface';
import { UserMessageHelper } from 'src/utils/message.helps';

@Injectable()
export class LoginUserUseCase {
    constructor(
        @Inject('IUserRepository')
        private repository: IUserRepository,
    ) { }

    async authUsername(username: string): Promise<User> {
        const existUser = await this.repository.findByUsername(username);

        if (!existUser) {
            throw new HttpException(
                UserMessageHelper.INVALID_USERNAME_OR_PASSWORD,
                HttpStatus.BAD_REQUEST,
            );
        }
        return existUser;
    }
}
