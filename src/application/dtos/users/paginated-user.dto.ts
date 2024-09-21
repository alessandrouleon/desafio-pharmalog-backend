import { User } from "../../../domain/entities/users/user.entity";

export interface PaginatedUserDTO {
    users: User[];
    total: number;
    currentPage: number;
    nextPage: number;
    prevPage: number;
    lastPage: number;
}
