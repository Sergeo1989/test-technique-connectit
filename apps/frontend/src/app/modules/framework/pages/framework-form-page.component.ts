import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// type-only: keep the NestJS barrel out of the browser bundle.
import type { ReadOneFramework } from "@nx-nestjs-angular-starter/api/framework";
import { FrameworkService, TopbarService } from "@nx-nestjs-angular-starter/frontend-shared";
import { MessageService } from "primeng/api";
import { FrameworkFormComponent } from "../components/framework-form/framework-form.component";
import { FrameworkFormValue } from "../models/framework-form.model";
import { SelectOption } from "../models/framework-table.model";
import { FrameworkOptionsService } from "../services/framework-options.service";

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
		private frameworkOptions: FrameworkOptionsService,
		private router: Router,
		private route: ActivatedRoute,
		private topbarService: TopbarService,
		private messageService: MessageService
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
			this.messageService.add({ severity: "success", summary: "Framework enregistré" });
			this.router.navigate([LIST_ROUTE]);
		} catch (error) {
			this.messageService.add({
				severity: "error",
				summary: "Échec de l'enregistrement",
				detail: this.errorMessage(error),
			});
		} finally {
			this.submitting = false;
		}
	}

	private errorMessage(error: unknown): string {
		if (error instanceof HttpErrorResponse) {
			if (error.status === HttpStatusCode.Conflict) {
				return "Un framework portant ce nom existe déjà.";
			}
			if (typeof error.error?.message === "string") {
				return error.error.message;
			}
		}
		return "Une erreur est survenue. Veuillez réessayer.";
	}

	onCancel() {
		this.router.navigate([LIST_ROUTE]);
	}

	private loadOptions() {
		this.frameworkOptions.getLanguageOptions().subscribe(options => (this.languageOptions = options));
		this.frameworkOptions.getTypeOptions().subscribe(options => (this.typeOptions = options));
	}
}
