import {
    Body,
    Controller,
    Delete,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { UpdateUserDto } from 'src/application/dtos/users/update-user.dto';
import { CreateUserUseCase } from 'src/application/use-cases/users/create-user.use-case';
import { DeleteUserUseCase } from 'src/application/use-cases/users/delete-user.use-case';
import { UpdateUserUseCase } from 'src/application/use-cases/users/update-user.use-case';

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
    ) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.createUserUseCase.execute(createUserDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.updateUserUseCase.execute(id, updateUserDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.deleteUserUseCase.execute(id);
    }

}