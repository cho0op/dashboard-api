import {NextFunction, Request, Response} from "express";

export interface IExceptionFilterInterface {
    catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
