import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// type-only: keep the NestJS barrel out of the browser bundle.
import type { ReadOneFramework } from "@nx-nestjs-angular-starter/api/framework";
import {
	CodingLanguageService,
	FrameworkService,
	FrameworkTypeService,
	TopbarService,
} from "@nx-nestjs-angular-starter/frontend-shared";
import { FrameworkFormComponent } from "../components/framework-form/framework-form.component";
import { FrameworkFormValue } from "../models/framework-form.model";
import { SelectOption } from "../models/framework-table.model";

const LIST_ROUTE = "/app/frameworks";

@Component({
	selector: "app-framework-form-page",
	standalone: true,
	imports: [FrameworkFormComponent],
	templateUrl: "./framework-form-page.component.html",
})
export class FrameworkFormPageComponent implements OnInit {
	framework: ReadOneFramework | null = null;
	languageOptions: SelectOption[] = [];
	typeOptions: SelectOption[] = [];
	submitting = false;

	private id: number | null = null;

	constructor(
		private frameworkService: FrameworkService,
		private codingLanguageService: CodingLanguageService,
		private frameworkTypeService: FrameworkTypeService,
		private router: Router,
		private route: ActivatedRoute,
		private topbarService: TopbarService
	) {}

	ngOnInit() {
		const idParam = this.route.snapshot.paramMap.get("id");
		this.id = idParam ? Number(idParam) : null;
		this.topbarService.setHeader(this.id ? "Modifier le framework" : "Nouveau framework");

		this.loadOptions();

		if (this.id) {
			this.frameworkService
				.readOne(this.id, { source: "server-only" })
				.subscribe(framework => (this.framework = framework));
		}
	}

	async onSave(value: FrameworkFormValue) {
		this.submitting = true;
		try {
			if (this.id) {
				await this.frameworkService.update(this.id, value);
			} else {
				await this.frameworkService.create(value);
			}
			this.router.navigate([LIST_ROUTE]);
		} finally {
			this.submitting = false;
		}
	}

	onCancel() {
		this.router.navigate([LIST_ROUTE]);
	}

	private loadOptions() {
		this.codingLanguageService.readAll({ source: "server-only" }).subscribe(languages => {
			this.languageOptions = languages.map(l => ({ label: l.name, value: l.id }));
		});
		this.frameworkTypeService.readAll({ source: "server-only" }).subscribe(types => {
			this.typeOptions = types.map(t => ({ label: t.name, value: t.id }));
		});
	}
}
