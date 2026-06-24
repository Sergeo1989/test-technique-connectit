import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { LoggerService, PrismaService } from "@nx-nestjs-angular-starter/connectit-shared-api";
import { type PaginatedResponse } from "@nx-nestjs-angular-starter/database";
import { Prisma, type Framework } from "@prisma/client";
import { type CreateFrameworkDTO } from "./dto/create-framework.dto";
import { FrameworkSortBy, type FrameworkQueryDTO, SortOrder } from "./dto/framework-query.dto";
import { type UpdateFrameworkDTO } from "./dto/update-framework.dto";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

const where = {
	deletedAt: null,
} satisfies Prisma.FrameworkWhereInput;

const include = {
	codingLanguage: true,
	frameworkType: true,
} satisfies Prisma.FrameworkInclude;

export type ReadOneFramework = Prisma.FrameworkGetPayload<{ include: typeof include }>;

@Injectable()
export class ApiFrameworkService {
	constructor(
		private prismaService: PrismaService,
		private logger: LoggerService
	) {
		this.logger.setContext(ApiFrameworkService.name);
	}

	async create(data: CreateFrameworkDTO) {
		await this.assertNoDuplicateName(data.name);
		await this.assertRelationsExist(data.codingLanguageId, data.frameworkTypeId);

		return this.prismaService.framework.create({ data, include });
	}

	readOne(id: Framework["id"]) {
		return this.prismaService.framework.findUnique({
			where: { ...where, id },
			include,
		});
	}

	readAll() {
		return this.prismaService.framework.findMany({ where, include });
	}

	async readPage(query: FrameworkQueryDTO): Promise<PaginatedResponse<ReadOneFramework>> {
		const page = query.page ?? DEFAULT_PAGE;
		const pageSize = query.pageSize ?? DEFAULT_PAGE_SIZE;

		const filters: Prisma.FrameworkWhereInput = {
			...where,
			// SQLite: no mode:"insensitive"; LIKE is already case-insensitive (ASCII).
			...(query.name ? { name: { contains: query.name } } : {}),
			...(query.codingLanguageId != null ? { codingLanguageId: query.codingLanguageId } : {}),
			...(query.frameworkTypeId != null ? { frameworkTypeId: query.frameworkTypeId } : {}),
		};

		const orderBy: Prisma.FrameworkOrderByWithRelationInput = {
			[query.sortBy ?? FrameworkSortBy.Id]: query.sortOrder ?? SortOrder.Asc,
		};

		const [data, total] = await this.prismaService.$transaction([
			this.prismaService.framework.findMany({
				where: filters,
				include,
				orderBy,
				skip: (page - 1) * pageSize,
				take: pageSize,
			}),
			this.prismaService.framework.count({ where: filters }),
		]);

		return { data, total, page, pageSize };
	}

	async update(id: Framework["id"], data: UpdateFrameworkDTO) {
		if (data.name !== undefined) {
			await this.assertNoDuplicateName(data.name, id);
		}
		await this.assertRelationsExist(data.codingLanguageId, data.frameworkTypeId);

		try {
			return await this.prismaService.framework.update({
				where: { ...where, id },
				data,
				include,
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
				throw new NotFoundException(`Framework ${id} not found`);
			}
			throw error;
		}
	}

	private async assertNoDuplicateName(name: string, excludeId?: Framework["id"]) {
		const duplicate = await this.prismaService.framework.findFirst({
			where: { ...where, name, ...(excludeId != null ? { id: { not: excludeId } } : {}) },
		});

		if (duplicate) {
			throw new ConflictException(`A framework named "${name}" already exists`);
		}
	}

	private async assertRelationsExist(codingLanguageId?: number, frameworkTypeId?: number) {
		if (codingLanguageId != null) {
			const language = await this.prismaService.codingLanguage.findFirst({
				where: { id: codingLanguageId, deletedAt: null },
			});
			if (!language) {
				throw new BadRequestException(`Unknown codingLanguageId ${codingLanguageId}`);
			}
		}

		if (frameworkTypeId != null) {
			const type = await this.prismaService.frameworkType.findUnique({ where: { id: frameworkTypeId } });
			if (!type) {
				throw new BadRequestException(`Unknown frameworkTypeId ${frameworkTypeId}`);
			}
		}
	}

	delete(id: Framework["id"]) {
		return this.prismaService.framework.update({
			where: { ...where, id },
			include,
			data: { deletedAt: new Date() },
		});
	}
}
