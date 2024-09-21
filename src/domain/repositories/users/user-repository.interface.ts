import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { User } from 'src/domain/entities/users/user.entity';
import { PaginatedData } from 'src/utils/pagination';

export interface IUserReturnWithPagination {
    users: User[];
    total: number;
}

export interface IUserRepository {
    create(user: CreateUserDto): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, user: Partial<User>): Promise<User | null>;
    delete(id: string, user: User): Promise<void>;
    findFilteredUsersWithPagination(
        value: string,
        parametersToPaginate: PaginatedData,
    ): Promise<IUserReturnWithPagination>;
    findAllUsersWithPagination(
        parametersToPaginate: PaginatedData,
    ): Promise<IUserReturnWithPagination>;
}
