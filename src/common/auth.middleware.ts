import { IMiddleware } from "./middleware.interface";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			const token: string = req.headers.authorization.split(" ")[1];
			verify(token, this.secret, (error, payload) => {
				if (error) {
					next();
				} else if (payload && typeof payload !== "string") {
					req.user = payload.email;
				}
			});
		}
		next();
	}
}
