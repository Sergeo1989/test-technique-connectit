import { BadRequestException, ConsoleLogger, INestApplication, ValidationError, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { LoggerService, PrismaService } from "@nx-nestjs-angular-starter/connectit-shared-api";
import * as request from "supertest";
import { ApiFrameworkController } from "./api-framework.controller";
import { ApiFrameworkService } from "./api-framework.service";

describe("ApiFrameworkController (integration)", () => {
	let app: INestApplication;
	let prisma: {
		framework: { findMany: jest.Mock; count: jest.Mock };
		$transaction: jest.Mock;
	};

	beforeEach(async () => {
		prisma = {
			framework: { findMany: jest.fn().mockResolvedValue([]), count: jest.fn().mockResolvedValue(0) },
			$transaction: jest.fn((operations: Promise<unknown>[]) => Promise.all(operations)),
		};

		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [ApiFrameworkController],
			providers: [
				ApiFrameworkService,
				{ provide: PrismaService, useValue: prisma },
				{ provide: LoggerService, useValue: new ConsoleLogger() },
			],
		}).compile();

		app = moduleRef.createNestApplication();
		app.useGlobalPipes(
			new ValidationPipe({
				transform: true,
				whitelist: true,
				exceptionFactory: (errors: ValidationError[] = []) => new BadRequestException(errors),
			})
		);
		await app.init();
	});

	afterEach(async () => {
		await app.close();
	});

	it("coerces query strings to numbers and returns a paginated envelope", async () => {
		prisma.framework.findMany.mockResolvedValue([{ id: 1 }]);
		prisma.framework.count.mockResolvedValue(1);

		const response = await request(app.getHttpServer())
			.get("/framework?page=2&pageSize=5&name=Re&codingLanguageId=3")
			.expect(200);

		expect(response.body).toEqual({ data: [{ id: 1 }], total: 1, page: 2, pageSize: 5 });

		expect(prisma.framework.findMany).toHaveBeenCalledWith(
			expect.objectContaining({
				skip: 5,
				take: 5,
				where: { deletedAt: null, name: { contains: "Re" }, codingLanguageId: 3 },
			})
		);
	});

	it("falls back to defaults when no query params are supplied", async () => {
		await request(app.getHttpServer()).get("/framework").expect(200);

		expect(prisma.framework.findMany).toHaveBeenCalledWith(
			expect.objectContaining({ skip: 0, take: 10, orderBy: { id: "asc" } })
		);
	});

	it("rejects invalid pagination values with 400", async () => {
		await request(app.getHttpServer()).get("/framework?page=0").expect(400);
		await request(app.getHttpServer()).get("/framework?pageSize=1000").expect(400);
		await request(app.getHttpServer()).get("/framework?sortBy=password").expect(400);
	});

	it("strips unknown query params (whitelist)", async () => {
		await request(app.getHttpServer()).get("/framework?evil=1").expect(200);

		expect(prisma.framework.findMany).toHaveBeenCalledWith(
			expect.objectContaining({ where: { deletedAt: null } })
		);
	});
});
