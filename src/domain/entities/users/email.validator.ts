import { HttpException, HttpStatus } from "@nestjs/common";
import { UserMessageHelper } from "src/utils/message.helps";

export class Email {
    private readonly value: string;

    constructor(email: string) {
        this.validateEmail(email);
        this.value = email;
    }

    private validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new HttpException(
                UserMessageHelper.INVALID_EMAIL,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    public getValue(): string {
        return this.value;
    }
}
