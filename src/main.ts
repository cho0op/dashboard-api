import {Container} from "inversify";
import {ILogger} from "./logger/logger.interface";
import {TYPES} from "./types";
import {LoggerService} from "./logger/logger.service";
import {ExceptionFilter} from "./errors/exception.filter";
import {UsersController} from "./users/users.controller";
import {IExceptionFilter} from "./errors/exception.filter.interface";
import {App} from "./app";

// const logger = new LoggerService();
// const app = new App(logger, new UsersController(logger), new ExceptionFilter(logger));

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
appContainer.bind<UsersController>(TYPES.UsersController).to(UsersController);
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);
app.init();

export {app, appContainer};
