import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { type Framework } from "@nx-nestjs-angular-starter/database";
import { ApiFrameworkService } from "./api-framework.service";
import { CreateFrameworkDTO } from "./dto/create-framework.dto";
import { UpdateFrameworkDTO } from "./dto/update-framework.dto";

@Controller("framework")
export class ApiFrameworkController {
	constructor(private apiFrameworkService: ApiFrameworkService) {}

	@Get()
	readAll() {
		return this.apiFrameworkService.readAll();
	}

	@Get(":id")
	readOne(@Param("id", ParseIntPipe) id: Framework["id"]) {
		return this.apiFrameworkService.readOne(id);
	}

	@Post()
	create(@Body() createFrameworkDTO: CreateFrameworkDTO) {
		return this.apiFrameworkService.create(createFrameworkDTO);
	}

	@Patch(":id")
	update(
		@Param("id", ParseIntPipe) id: Framework["id"],
		@Body() updateFrameworkDTO: UpdateFrameworkDTO
	) {
		return this.apiFrameworkService.update(id, updateFrameworkDTO);
	}

	@Delete(":id")
	delete(@Param("id", ParseIntPipe) id: Framework["id"]) {
		return this.apiFrameworkService.delete(id);
	}
}
