import { BadRequestException, Logger, type ValidationError, ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggerService, PrismaExceptionFilter } from "@nx-nestjs-angular-starter/connectit-shared-api";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = "api";
	app.setGlobalPrefix(globalPrefix);

	app.enableCors({
		origin: "*",
	});

	app.useLogger(await app.resolve(LoggerService));

	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: "1",
	});

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			exceptionFactory: (validationErrors: ValidationError[] = []) => {
				return new BadRequestException(validationErrors);
			},
		})
	);

	app.useGlobalFilters(new PrismaExceptionFilter());

	const port = 8080;

	await app.listen(port);
	Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}/v1`);
}

bootstrap();
