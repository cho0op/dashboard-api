import "reflect-metadata";
import { BaseController } from "../common/base.controller";
import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../errors/http-error.class";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import { IUsersController } from "./users.controller.interface";

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{
				path: "/login",
				func: this.login,
				method: "post",
			},
			{
				path: "/register",
				func: this.register,
				method: "post",
			},
		]);
	}

	public register(req: Request, res: Response, next: NextFunction): void {
		return next(new HTTPError(403, "Invalid data sent"));
	}

	public login(req: Request, res: Response, next: NextFunction): Response {
		return this.ok(res, "login");
	}
}
