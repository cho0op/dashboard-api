import { Container, ContainerModule, interfaces } from "inversify";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { LoggerService } from "./logger/logger.service";
import { ExceptionFilter } from "./errors/exception.filter";
import { UsersController } from "./users/users.controller";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import { App } from "./app";
import { IUsersController } from "./users/users.controller.interface";
import { IUsersService } from "./users/users.service.interface";
import { UsersService } from "./users/users.service";
import { ConfigService } from "./config/config.service";
import { IConfigService } from "./config/config.service.interface";
import { PrismaService } from "./database/prisma.service";
import { UsersRepository } from "./users/users.repository";
import { IUsersRepository } from "./users/users.repository.interface";

export interface IAppReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUsersController>(TYPES.UsersController).to(UsersController);
	bind<IUsersService>(TYPES.UsersService).to(UsersService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

const bootstrap = async (): Promise<IAppReturn> => {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { app, appContainer };
};

export const boot = bootstrap();
