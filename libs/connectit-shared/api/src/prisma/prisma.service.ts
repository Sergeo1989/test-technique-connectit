/* eslint-disable */

/* eslint-disable @typescript-eslint/require-await */
import { Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class PrismaService extends PrismaClient {
	constructor(private logger: LoggerService) {
		super({
			log: [
				{ emit: "event", level: "query" },
				{ emit: "stdout", level: "info" },
				{ emit: "stdout", level: "warn" },
				{ emit: "stdout", level: "error" },
			],
			errorFormat: "colorless",
		});

		this.logger.setContext(PrismaService.name);

		this.$use(async (params, next) => {
			const before = Date.now();

			const result = await next(params);

			const after = Date.now();

			this.logger.debug(`Query ${params.model}.${params.action} took ${after - before}ms`);

			return result;
		});
	}

	public async onModuleInit() {
		await this.$connect();
	}
}
