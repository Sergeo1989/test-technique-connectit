import { Global, Module } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { ClsModule } from "nestjs-cls";
import { v4 } from "uuid";

@Global()
@Module({
	imports: [
		ClsModule.forRoot({
			global: true,
			middleware: {
				mount: false,
				generateId: true,
				idGenerator: () => v4(),
			},
		}),
	],
	providers: [LoggerService],
	exports: [LoggerService],
})
export class LoggerModule {}
