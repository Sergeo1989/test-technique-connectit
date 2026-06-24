import { BadRequestException, ConflictException, ConsoleLogger, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { LoggerService, PrismaService } from "@nx-nestjs-angular-starter/connectit-shared-api";
import { Prisma } from "@prisma/client";
import { ApiFrameworkService } from "./api-framework.service";
import { FrameworkSortBy, SortOrder } from "./dto/framework-query.dto";

const CREATE_BODY = {
	name: "Svelte",
	img: "https://cdn.simpleicons.org/svelte",
	codingLanguageId: 2,
	frameworkTypeId: 1,
	releasedAt: new Date("2016-11-26T00:00:00.000Z"),
};

const prismaError = (code: string) =>
	new Prisma.PrismaClientKnownRequestError(code, { code, clientVersion: "5" });

describe("ApiFrameworkService", () => {
	let service: ApiFrameworkService;
	let prisma: {
		framework: { findMany: jest.Mock; count: jest.Mock; create: jest.Mock; update: jest.Mock };
		$transaction: jest.Mock;
	};

	beforeEach(async () => {
		prisma = {
			framework: {
				findMany: jest.fn(),
				count: jest.fn(),
				create: jest.fn().mockResolvedValue({ id: 1 }),
				update: jest.fn().mockResolvedValue({ id: 1 }),
			},
			$transaction: jest.fn((operations: Promise<unknown>[]) => Promise.all(operations)),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ApiFrameworkService,
				{ provide: PrismaService, useValue: prisma },
				{ provide: LoggerService, useValue: new ConsoleLogger() },
			],
		}).compile();

		service = module.get(ApiFrameworkService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("readPage", () => {
		it("applies default page/pageSize and id-asc ordering when no query is given", async () => {
			prisma.framework.findMany.mockResolvedValue([]);
			prisma.framework.count.mockResolvedValue(0);

			const result = await service.readPage({});

			expect(prisma.framework.findMany).toHaveBeenCalledWith(
				expect.objectContaining({
					where: { deletedAt: null },
					orderBy: { id: "asc" },
					skip: 0,
					take: 10,
				})
			);
			expect(result).toEqual({ data: [], total: 0, page: 1, pageSize: 10 });
		});

		it("computes skip from page and pageSize", async () => {
			prisma.framework.findMany.mockResolvedValue([]);
			prisma.framework.count.mockResolvedValue(42);

			const result = await service.readPage({ page: 3, pageSize: 5 });

			expect(prisma.framework.findMany).toHaveBeenCalledWith(
				expect.objectContaining({ skip: 10, take: 5 })
			);
			expect(result).toMatchObject({ total: 42, page: 3, pageSize: 5 });
		});

		it("builds a combined where clause from all filters (name uses contains)", async () => {
			prisma.framework.findMany.mockResolvedValue([]);
			prisma.framework.count.mockResolvedValue(0);

			await service.readPage({ name: "Re", codingLanguageId: 2, frameworkTypeId: 7 });

			const expectedWhere = {
				deletedAt: null,
				name: { contains: "Re" },
				codingLanguageId: 2,
				frameworkTypeId: 7,
			};
			expect(prisma.framework.findMany).toHaveBeenCalledWith(
				expect.objectContaining({ where: expectedWhere })
			);
			expect(prisma.framework.count).toHaveBeenCalledWith({ where: expectedWhere });
		});

		it("honours sortBy / sortOrder", async () => {
			prisma.framework.findMany.mockResolvedValue([]);
			prisma.framework.count.mockResolvedValue(0);

			await service.readPage({ sortBy: FrameworkSortBy.Name, sortOrder: SortOrder.Desc });

			expect(prisma.framework.findMany).toHaveBeenCalledWith(
				expect.objectContaining({ orderBy: { name: "desc" } })
			);
		});
	});

	describe("create", () => {
		it("delegates to prisma and returns the row", async () => {
			await service.create(CREATE_BODY);

			expect(prisma.framework.create).toHaveBeenCalledWith(
				expect.objectContaining({ data: CREATE_BODY })
			);
		});

		it("maps a unique-constraint violation (P2002) to 409", async () => {
			prisma.framework.create.mockRejectedValue(prismaError("P2002"));

			await expect(service.create(CREATE_BODY)).rejects.toBeInstanceOf(ConflictException);
		});

		it("maps a foreign-key violation (P2003) to 400", async () => {
			prisma.framework.create.mockRejectedValue(prismaError("P2003"));

			await expect(service.create(CREATE_BODY)).rejects.toBeInstanceOf(BadRequestException);
		});
	});

	describe("update", () => {
		it("maps a missing row (P2025) to 404", async () => {
			prisma.framework.update.mockRejectedValue(prismaError("P2025"));

			await expect(service.update(999, { name: "X" })).rejects.toBeInstanceOf(NotFoundException);
		});

		it("maps a unique-constraint violation (P2002) to 409", async () => {
			prisma.framework.update.mockRejectedValue(prismaError("P2002"));

			await expect(service.update(1, { name: "React" })).rejects.toBeInstanceOf(ConflictException);
		});
	});
});
