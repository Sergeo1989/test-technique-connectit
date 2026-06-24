import { Injectable } from "@nestjs/common";
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

// `deletedAt` is an internal soft-delete flag: omit it from the API contract,
// on the framework and on the related coding language.
const omit = { deletedAt: true } satisfies Prisma.FrameworkOmit;

const include = {
	codingLanguage: { omit: { deletedAt: true } },
	frameworkType: true,
} satisfies Prisma.FrameworkInclude;

export type ReadOneFramework = Prisma.FrameworkGetPayload<{ include: typeof include; omit: typeof omit }>;

@Injectable()
export class ApiFrameworkService {
	constructor(
		private prismaService: PrismaService,
		private logger: LoggerService
	) {
		this.logger.setContext(ApiFrameworkService.name);
	}

	create(data: CreateFrameworkDTO) {
		return this.prismaService.framework.create({ data, include, omit });
	}

	readOne(id: Framework["id"]) {
		return this.prismaService.framework.findUnique({
			where: { ...where, id },
			include,
			omit,
		});
	}

	readAll() {
		return this.prismaService.framework.findMany({ where, include, omit });
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
				omit,
				orderBy,
				skip: (page - 1) * pageSize,
				take: pageSize,
			}),
			this.prismaService.framework.count({ where: filters }),
		]);

		return { data, total, page, pageSize };
	}

	update(id: Framework["id"], data: UpdateFrameworkDTO) {
		return this.prismaService.framework.update({
			where: { ...where, id },
			data,
			include,
			omit,
		});
	}

	delete(id: Framework["id"]) {
		return this.prismaService.framework.update({
			where: { ...where, id },
			include,
			omit,
			data: { deletedAt: new Date() },
		});
	}
}
