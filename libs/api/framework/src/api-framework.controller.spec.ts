import { BadRequestException, ConsoleLogger, INestApplication, ValidationError, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { LoggerService, PrismaExceptionFilter, PrismaService } from "@nx-nestjs-angular-starter/connectit-shared-api";
import { Prisma } from "@prisma/client";
import * as request from "supertest";
import { ApiFrameworkController } from "./api-framework.controller";
import { ApiFrameworkService } from "./api-framework.service";

const VALID_BODY = {
	name: "Svelte",
	img: "https://cdn.simpleicons.org/svelte",
	codingLanguageId: 2,
	frameworkTypeId: 1,
	releasedAt: "2016-11-26T00:00:00.000Z",
};

describe("ApiFrameworkController (integration)", () => {
	let app: INestApplication;
	let prisma: {
		framework: { findMany: jest.Mock; count: jest.Mock; create: jest.Mock; update: jest.Mock };
		$transaction: jest.Mock;
	};

	beforeEach(async () => {
		prisma = {
			framework: {
				findMany: jest.fn().mockResolvedValue([]),
				count: jest.fn().mockResolvedValue(0),
				create: jest.fn().mockResolvedValue({ id: 1 }),
				update: jest.fn().mockResolvedValue({ id: 1 }),
			},
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
		app.useGlobalFilters(new PrismaExceptionFilter());
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

	describe("POST /framework", () => {
		it("creates a framework from a valid body", async () => {
			await request(app.getHttpServer()).post("/framework").send(VALID_BODY).expect(201);

			expect(prisma.framework.create).toHaveBeenCalledWith(
				expect.objectContaining({ data: VALID_BODY })
			);
		});

		it("rejects a body missing required fields with 400", async () => {
			const withoutName: Record<string, unknown> = { ...VALID_BODY };
			delete withoutName["name"];
			await request(app.getHttpServer()).post("/framework").send(withoutName).expect(400);
			expect(prisma.framework.create).not.toHaveBeenCalled();
		});

		it("strips unknown fields (whitelist)", async () => {
			await request(app.getHttpServer())
				.post("/framework")
				.send({ ...VALID_BODY, hacked: true })
				.expect(201);

			expect(prisma.framework.create).toHaveBeenCalledWith(
				expect.objectContaining({ data: VALID_BODY })
			);
		});

		it("returns 409 on a duplicate name (Prisma P2002)", async () => {
			prisma.framework.create.mockRejectedValue(
				new Prisma.PrismaClientKnownRequestError("P2002", { code: "P2002", clientVersion: "5" })
			);

			await request(app.getHttpServer()).post("/framework").send(VALID_BODY).expect(409);
		});

		it("returns 400 on an unknown relation (Prisma P2003)", async () => {
			prisma.framework.create.mockRejectedValue(
				new Prisma.PrismaClientKnownRequestError("P2003", { code: "P2003", clientVersion: "5" })
			);

			await request(app.getHttpServer()).post("/framework").send(VALID_BODY).expect(400);
		});
	});

	describe("PATCH /framework/:id", () => {
		it("applies a partial update", async () => {
			await request(app.getHttpServer()).patch("/framework/1").send({ name: "Renamed" }).expect(200);

			expect(prisma.framework.update).toHaveBeenCalledWith(
				expect.objectContaining({ where: { deletedAt: null, id: 1 }, data: { name: "Renamed" } })
			);
		});

		it("rejects an invalid field type with 400", async () => {
			await request(app.getHttpServer())
				.patch("/framework/1")
				.send({ codingLanguageId: "not-a-number" })
				.expect(400);
		});

		it("returns 404 when the framework does not exist", async () => {
			prisma.framework.update.mockRejectedValue(
				new Prisma.PrismaClientKnownRequestError("Not found", { code: "P2025", clientVersion: "5" })
			);

			await request(app.getHttpServer()).patch("/framework/999").send({ name: "X" }).expect(404);
		});
	});
});
