import "reflect-metadata";
import { BaseController } from "../common/base.controller";
import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../errors/http-error.class";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import { IUsersController } from "./users.controller.interface";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { IUsersService } from "./users.service.interface";
import { ValidateMiddleware } from "../common/validate.middleware";
import { IConfigService } from "../config/config.service.interface";

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UsersService) private usersService: IUsersService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: "/login",
				func: this.login,
				method: "post",
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: "/register",
				func: this.register,
				method: "post",
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}

	public async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.usersService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, "User with such email exists"));
		}
		this.loggerService.log("configService", this.configService.get("SALT"));

		this.ok(res, { email: result.email, id: result.id });
	}

	public async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.usersService.validateUser(body);
		if (!result) {
			return next(new HTTPError(403, "Wrong Email or Password"));
		}
		this.ok(res, "login");
	}
}
