import { IMiddleware } from "./middleware.interface";
import { NextFunction, Request, Response } from "express";

export class GuardMiddleware implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (!req.user) {
			res.status(401).send("unauthorized");
		} else {
			next();
		}
	}
}
