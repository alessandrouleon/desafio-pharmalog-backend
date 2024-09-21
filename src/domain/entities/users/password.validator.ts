import { HttpException, HttpStatus } from "@nestjs/common";
import { UserMessageHelper } from "src/utils/message.helps";

export class Password {
    private readonly value: string;

    constructor(password: string) {
        this.validatePassword(password);
        this.value = password;
    }

    private validatePassword(password: string): void {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
            throw new HttpException(
                UserMessageHelper.INVALID_PASSWORD,
                HttpStatus.BAD_REQUEST,
            );

        }
    }

    public getValue(): string {
        return this.value;
    }
}
