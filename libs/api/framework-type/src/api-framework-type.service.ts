import { Injectable } from "@nestjs/common";
import { LoggerService, PrismaService } from "@nx-nestjs-angular-starter/connectit-shared-api";
import { type FrameworkType } from "@prisma/client";
import { type CreateFrameworkTypeDTO } from "./dto/create-framework-type.dto";
import { type UpdateFrameworkTypeDTO } from "./dto/update-framework-type.dto";

export type ReadOneFrameworkType = FrameworkType;

@Injectable()
export class ApiFrameworkTypeService {
	constructor(
		private prismaService: PrismaService,
		private logger: LoggerService
	) {
		this.logger.setContext(ApiFrameworkTypeService.name);
	}

	create(data: CreateFrameworkTypeDTO) {
		return this.prismaService.frameworkType.create({ data });
	}

	readOne(id: FrameworkType["id"]) {
		return this.prismaService.frameworkType.findUnique({
			where: { id },
		});
	}

	readAll() {
		return this.prismaService.frameworkType.findMany();
	}

	update(id: FrameworkType["id"], data: UpdateFrameworkTypeDTO) {
		return this.prismaService.frameworkType.update({
			where: { id },
			data,
		});
	}

	delete(id: FrameworkType["id"]) {
		return this.prismaService.frameworkType.delete({
			where: { id },
		});
	}
}
