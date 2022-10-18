import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {NextFunction, Request, Response} from "express";

export class UsersController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([{
            path: "/login",
            func: this.login,
            method: "post",
        }]);
    }

    public login(req: Request, res: Response, next: NextFunction) {
        return this.ok(res, "login");
    }
}
