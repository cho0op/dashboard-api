import "reflect-metadata";
import { Container } from "inversify";

import { IConfigService } from "../config/config.service.interface";
import { IUsersRepository } from "./users.repository.interface";
import { IUsersService } from "./users.service.interface";
import { UsersService } from "./users.service";
import { TYPES } from "../types";
import { User } from "./user.entity";
import { UserModel } from "@prisma/client";
import { hash } from "bcryptjs";

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUsersService;

beforeAll(() => {
	container.bind<IUsersService>(TYPES.UsersService).to(UsersService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUsersService>(TYPES.UsersService);
});

describe("Users Service", () => {
	it("createUser", async () => {
		configService.get = jest.fn().mockReturnValueOnce("1");
		usersRepository.create = jest.fn().mockImplementationOnce((user: User): UserModel => {
			return {
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			};
		});

		const createdUser = await usersService.createUser({
			email: "test@test.com",
			name: "test",
			password: "test",
		});

		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual(1);
	});

	it("validateUser - success", async () => {
		usersRepository.find = jest.fn().mockImplementationOnce(async (): Promise<User> => {
			const passwordHash = await hash("test", 10);
			return new User("test@test.com", "test", passwordHash);
		});
		const validatedUser = await usersService.validateUser({
			email: "test@test.com",
			password: "test",
		});
		expect(validatedUser).toBeTruthy();
	});
	it("validateUser - wrong password", async () => {
		usersRepository.find = jest.fn().mockImplementationOnce(async (): Promise<User> => {
			const passwordHash = await hash("wrongtest", 10);
			return new User("test@test.com", "test", passwordHash);
		});
		const validatedUser = await usersService.validateUser({
			email: "test@test.com",
			password: "test",
		});
		expect(validatedUser).toBeFalsy();
	});
	it("validateUser - no user", async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const validatedUser = await usersService.validateUser({
			email: "test@test.com",
			password: "test",
		});
		expect(validatedUser).toBeFalsy();
	});
});
