import { IsEmail, IsString } from "class-validator";

export class UserRegisterDto {
	@IsString({ message: "Name is empty" })
	name: string;

	@IsString({ message: "Password is empty" })
	password: string;

	@IsEmail({}, { message: "Wrong Email" })
	email: string;
}
