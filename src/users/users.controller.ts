import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {NextFunction, Request, Response} from "express";
import {HTTPError} from "../errors/http-error.class";

export class UsersController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
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
            }
        ]);

    }

    public register(req: Request, res: Response, next: NextFunction) {
        return next(new HTTPError(403, "Invalid data sent"));
    }

    public login(req: Request, res: Response, next: NextFunction) {
        return this.ok(res, "login");
    }
}
