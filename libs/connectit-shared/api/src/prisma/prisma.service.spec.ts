import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "./prisma.service";
import { LoggerService } from "../logger/logger.service";
import { ConsoleLogger } from "@nestjs/common";

describe("PrismaService", () => {
	let service: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PrismaService, { provide: LoggerService, useValue: new ConsoleLogger() }],
		}).compile();

		service = module.get<PrismaService>(PrismaService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
