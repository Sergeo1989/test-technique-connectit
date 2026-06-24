import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { type FrameworkType } from "@nx-nestjs-angular-starter/database";
import { ApiFrameworkTypeService } from "./api-framework-type.service";
import { CreateFrameworkTypeDTO } from "./dto/create-framework-type.dto";
import { UpdateFrameworkTypeDTO } from "./dto/update-framework-type.dto";

@Controller("framework-type")
export class ApiFrameworkTypeController {
	constructor(private apiFrameworkTypeService: ApiFrameworkTypeService) {}

	@Get()
	readAll() {
		return this.apiFrameworkTypeService.readAll();
	}

	@Get(":id")
	readOne(@Param("id", ParseIntPipe) id: FrameworkType["id"]) {
		return this.apiFrameworkTypeService.readOne(id);
	}

	@Post()
	create(@Body() createFrameworkTypeDTO: CreateFrameworkTypeDTO) {
		return this.apiFrameworkTypeService.create(createFrameworkTypeDTO);
	}

	@Patch(":id")
	update(
		@Param("id", ParseIntPipe) id: FrameworkType["id"],
		@Body() updateFrameworkTypeDTO: UpdateFrameworkTypeDTO
	) {
		return this.apiFrameworkTypeService.update(id, updateFrameworkTypeDTO);
	}

	@Delete(":id")
	delete(@Param("id", ParseIntPipe) id: FrameworkType["id"]) {
		return this.apiFrameworkTypeService.delete(id);
	}
}

