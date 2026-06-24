import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { type CodingLanguage } from "@nx-nestjs-angular-starter/database";
import { ApiCodingLanguageService } from "./api-coding-language.service";
import { CreateCodingLanguageDTO } from "./dto/create-coding-language.dto";
import { UpdateCodingLanguageDTO } from "./dto/update-coding-language.dto";

@Controller("coding-language")
export class ApiCodingLanguageController {
	constructor(private apiCodingLanguageService: ApiCodingLanguageService) {}

	@Get()
	readAll() {
		return this.apiCodingLanguageService.readAll();
	}

	@Get(":id")
	readOne(@Param("id", ParseIntPipe) id: CodingLanguage["id"]) {
		return this.apiCodingLanguageService.readOne(id);
	}

	@Post()
	create(@Body() createCodingLanguageDTO: CreateCodingLanguageDTO) {
		return this.apiCodingLanguageService.create(createCodingLanguageDTO);
	}

	@Patch(":id")
	update(
		@Param("id", ParseIntPipe) id: CodingLanguage["id"],
		@Body() updateCodingLanguageDTO: UpdateCodingLanguageDTO
	) {
		return this.apiCodingLanguageService.update(id, updateCodingLanguageDTO);
	}

	@Delete(":id")
	delete(@Param("id", ParseIntPipe) id: CodingLanguage["id"]) {
		return this.apiCodingLanguageService.delete(id);
	}
}

