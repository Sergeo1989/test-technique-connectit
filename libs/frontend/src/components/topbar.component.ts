import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TopbarService } from "../services/topbar.service";

@Component({
	selector: "connectit-ui-topbar",
	standalone: true,
	imports: [RouterModule, CommonModule],
	template: `
		<div class="flex h-fit w-full justify-between border border-b-slate-500 bg-white p-2">
			<h1 class="text-lg font-bold">{{ sectionTitle$ | async }}</h1>
			<!-- <button class="hidden items-center lg:flex" (click)="logout()">
				<span class="hidden lg:inline-block">Se déconnecter</span>
				<i class="bi bi-box-arrow-right ml-2 text-xl"></i>
			</button>
			<button class="text-primary outline-none lg:hidden" (click)="toggleMenuClick$.emit()">
				<svg
					class="h-8 w-8"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					viewBox="0 0 24 24"
				>
					<path d="M4 6h16M4 12h16M4 18h16"></path>
				</svg>
			</button> -->
		</div>
	`,
})
export class TopbarComponent {
	sectionTitle$ = this.topbarService.getHeader();

	@Output() toggleMenuClick$ = new EventEmitter<void>();

	constructor(private topbarService: TopbarService) {}
}
