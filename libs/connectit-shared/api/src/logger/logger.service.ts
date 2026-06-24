import { ConsoleLogger, Injectable, Scope } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import { ConfigService } from "../config/config.service";

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private logger: any;

	constructor(
		private configService: ConfigService,
		private readonly cls: ClsService
	) {
		super();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	override log(message: string, extras?: any) {
		super.log(message);

		if (this.configService.isProduction || this.configService.isQA) {
			this.logger.log("info", message, {
				correlationId: this.cls.getId(),
				extras: typeof extras === "object" ? extras : undefined,
			});
		}
	}

	override error(message: string, trace?: string | object, context?: string) {
		super.error(message, trace, context);
		if (this.configService.isProduction || this.configService.isQA) {
			// Prepare the metadata for structured logging
			const metadata =
				trace instanceof Error ? { error: trace.message, stack: trace.stack } : { extraDetails: trace };
			// Log the error with winston, including the stack trace if available
			this.logger.error(message, { metadata, correlationId: this.cls.getId() });
		}
	}

	override warn(message: string, context?: string) {
		super.warn(message, context); // Log to NestJS built-in logger
		if (this.configService.isProduction || this.configService.isQA) {
			this.logger.warn(message, { context, correlationId: this.cls.getId() });
		}
	}

	info(message: string, context?: string) {
		super.log(message, context); // Using super.log for console, adjust if needed
		if (this.configService.isProduction || this.configService.isQA) {
			this.logger.info(message, { context, correlationId: this.cls.getId() });
		}
	}

	// Implement a debug method for debug messages
	override debug(message: string, context?: string) {
		super.debug(message, context); // Log to NestJS built-in logger
		if (this.configService.isProduction || this.configService.isQA) {
			this.logger.debug(message, { context, correlationId: this.cls.getId() });
		}
	}

	// Implement a verbose method for verbose messages
	override verbose(message: string, context?: string) {
		super.verbose(message, context); // Log to NestJS built-in logger
		if (this.configService.isProduction || this.configService.isQA) {
			this.logger.verbose(message, { context, correlationId: this.cls.getId() });
		}
	}
}
