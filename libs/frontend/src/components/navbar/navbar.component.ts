import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BaseSidebarMenuSharedComponent } from "./base-sidebar-menu-shared.base";

@Component({
	selector: "connectit-ui-navbar",
	imports: [CommonModule, RouterModule, NgOptimizedImage],
	template: `
		<div class="hidden h-full w-[223px] flex-col bg-grey-gradient p-4 text-white lg:flex">
			<img [ngSrc]="logo" [priority]="true" *ngIf="logo" class="mx-2" height="94" width="175" />
			<ul class="mt-8 flex flex-col gap-1">
				<li *ngFor="let item of items">
					<a
						[routerLink]="item.path"
						class="flex cursor-pointer items-center gap-4 rounded-md px-2 py-1 transition-colors hover:bg-white/20 hover:text-primary"
						routerLinkActive="bg-white/10"
						(click)="handleItemClick(item)"
					>
						<i [ngClass]="item.icon" *ngIf="item.icon" class="text-lg font-medium"></i>
						<span>{{ item.label }}</span>
					</a>
				</li>
			</ul>
		</div>

		<div
			[ngClass]="{ hidden: !collapsed }"
			class="absolute z-10 w-full bg-grey-gradient text-lg font-medium text-white lg:hidden"
		>
			<ul (click)="collapsed = !collapsed">
				<li
					*ngFor="let item of items"
					class="cursor-pointer rounded-lg p-2 hover:bg-white/40 hover:text-primary"
					routerLinkActive="bg-white/40"
					(click)="handleItemClick(item)"
				>
					<a [routerLink]="item.path" class="flex items-center gap-x-4">
						<i [ngClass]="item.icon" *ngIf="item.icon"></i>
						<span>{{ item.label }}</span>
					</a>
				</li>
			</ul>
		</div>
	`,
	standalone: true,
})
export class NavbarComponent extends BaseSidebarMenuSharedComponent {}
