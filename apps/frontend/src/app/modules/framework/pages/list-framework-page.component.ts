import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FrameworkService, TopbarService } from "@nx-nestjs-angular-starter/frontend-shared";
import { tap } from "rxjs";
import { FrameworkCardComponent } from "../components/framework-card.component";

@Component({
	selector: "app-list-framework-page",
	standalone: true,
	imports: [CommonModule, FrameworkCardComponent],
	template: `
		<div class="flex flex-col gap-4">
			<ng-container *ngIf="frameworks$ | async as frameworks">
				@if (loading) {
					<div class="flex items-center justify-center py-16">
						<i class="bi bi-arrow-repeat animate-spin text-3xl text-slate-400"></i>
					</div>
				} @else if (frameworks.length === 0) {
					<div class="flex flex-col items-center justify-center gap-2 py-16 text-slate-400">
						<i class="bi bi-box-seam text-4xl"></i>
						<p class="text-sm">Aucun framework trouvé.</p>
					</div>
				} @else {
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
						@for (framework of frameworks; track framework.id) {
							<app-framework-card [framework]="framework" />
						}
					</div>
				}
			</ng-container>
		</div>
	`,
})
export class ListFrameworkPageComponent {
	frameworks$ = this.frameworkService.readAll().pipe(
		tap(() => (this.loading = false)),
	);
	loading = true;

	constructor(
		private frameworkService: FrameworkService,
		private topbarService: TopbarService
	) {
		this.topbarService.setHeader("Frameworks");
	}
}
