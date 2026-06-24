import { Injectable } from "@nestjs/common";
import { LoggerService, PrismaService } from "@nx-nestjs-angular-starter/connectit-shared-api";
import { type CodingLanguage, type Prisma } from "@prisma/client";
import { type CreateCodingLanguageDTO } from "./dto/create-coding-language.dto";
import { type UpdateCodingLanguageDTO } from "./dto/update-coding-language.dto";

const where = {
	deletedAt: null,
} satisfies Prisma.CodingLanguageWhereInput;

export type ReadOneCodingLanguage = CodingLanguage;

@Injectable()
export class ApiCodingLanguageService {
	constructor(
		private prismaService: PrismaService,
		private logger: LoggerService
	) {
		this.logger.setContext(ApiCodingLanguageService.name);
	}

	create(data: CreateCodingLanguageDTO) {
		return this.prismaService.codingLanguage.create({ data });
	}

	readOne(id: CodingLanguage["id"]) {
		return this.prismaService.codingLanguage.findUnique({
			where: { ...where, id },
		});
	}

	readAll() {
		return this.prismaService.codingLanguage.findMany({ where });
	}

	update(id: CodingLanguage["id"], data: UpdateCodingLanguageDTO) {
		return this.prismaService.codingLanguage.update({
			where: { ...where, id },
			data,
		});
	}

	delete(id: CodingLanguage["id"]) {
		return this.prismaService.codingLanguage.update({
			where: { ...where, id },
			data: { deletedAt: new Date() },
		});
	}
}
