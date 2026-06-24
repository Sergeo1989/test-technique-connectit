import { Injectable } from "@nestjs/common";
import { LoggerService, PrismaService } from "@nx-nestjs-angular-starter/connectit-shared-api";
import { Prisma, type Framework } from "@prisma/client";
import { type CreateFrameworkDTO } from "./dto/create-framework.dto";
import { type UpdateFrameworkDTO } from "./dto/update-framework.dto";

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

	create(data: CreateFrameworkDTO) {
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

	update(id: Framework["id"], data: UpdateFrameworkDTO) {
		return this.prismaService.framework.update({
			where: { ...where, id },
			data,
			include,
		});
	}

	delete(id: Framework["id"]) {
		return this.prismaService.framework.update({
			where: { ...where, id },
			include,
			data: { deletedAt: new Date() },
		});
	}
}
