import { Injectable } from "@angular/core";
import { CodingLanguageService, FrameworkTypeService } from "@nx-nestjs-angular-starter/frontend-shared";
import { map, Observable } from "rxjs";
import { SelectOption } from "../models/framework-table.model";

/** Loads the language/type dropdown options, shared by the list and form pages. */
@Injectable({ providedIn: "root" })
export class FrameworkOptionsService {
	constructor(
		private codingLanguageService: CodingLanguageService,
		private frameworkTypeService: FrameworkTypeService
	) {}

	getLanguageOptions(): Observable<SelectOption[]> {
		return this.codingLanguageService
			.readAll({ source: "server-only" })
			.pipe(map(languages => languages.map(l => ({ label: l.name, value: l.id }))));
	}

	getTypeOptions(): Observable<SelectOption[]> {
		return this.frameworkTypeService
			.readAll({ source: "server-only" })
			.pipe(map(types => types.map(t => ({ label: t.name, value: t.id }))));
	}
}
