import {Container, ContainerModule, interfaces} from "inversify";
import {ILogger} from "./logger/logger.interface";
import {TYPES} from "./types";
import {LoggerService} from "./logger/logger.service";
import {ExceptionFilter} from "./errors/exception.filter";
import {UsersController} from "./users/users.controller";
import {IExceptionFilter} from "./errors/exception.filter.interface";
import {App} from "./app";
import {IUsersController} from "./users/users.controller.interface";

// const logger = new LoggerService();
// const app = new App(logger, new UsersController(logger), new ExceptionFilter(logger));

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService);
    bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
    bind<IUsersController>(TYPES.UsersController).to(UsersController);
    bind<App>(TYPES.Application).to(App);
});

const bootstrap = () => {
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application);
    app.init();

    return {app, appContainer};
};

export const {app, appContainer} = bootstrap();
