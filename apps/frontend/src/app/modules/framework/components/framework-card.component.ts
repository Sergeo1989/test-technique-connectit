import { Component, Input } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { ReadOneFramework } from "@nx-nestjs-angular-starter/api/framework";

@Component({
	selector: "app-framework-card",
	standalone: true,
	imports: [CommonModule, DatePipe],
	template: `
		<div class="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
			<div class="flex h-32 items-center justify-center bg-slate-100 p-4">
				<img
					*ngIf="framework.img; else placeholder"
					[src]="framework.img"
					[alt]="framework.name"
					class="h-full w-full object-contain"
					(error)="onImgError($event)"
				/>
				<ng-template #placeholder>
					<i class="bi bi-box text-4xl text-slate-400"></i>
				</ng-template>
			</div>

			<div class="flex flex-1 flex-col gap-2 p-4">
				<h3 class="text-base font-semibold text-slate-800">{{ framework.name }}</h3>

				<div class="flex flex-wrap gap-2">
					<span class="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
						<i class="bi bi-code-slash"></i>
						{{ framework.codingLanguage.name }}
					</span>
					<span class="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
						<i class="bi bi-tag"></i>
						{{ framework.frameworkType.name }}
					</span>
				</div>

				<p class="mt-auto text-xs text-slate-400">
					Sorti le {{ framework.releasedAt | date: "dd/MM/yyyy" }}
				</p>
			</div>
		</div>
	`,
})
export class FrameworkCardComponent {
	@Input({ required: true }) framework!: ReadOneFramework;

	onImgError(event: Event) {
		(event.target as HTMLImageElement).style.display = "none";
	}
}
