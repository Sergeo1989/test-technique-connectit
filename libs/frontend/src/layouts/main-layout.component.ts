import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { TopbarComponent } from "../components/topbar.component";

@Component({
	imports: [NavbarComponent, TopbarComponent, RouterModule],
	selector: "connectit-ui-main-layout",
	standalone: true,
	template: `
		<!-- Page Container -->
		<div class="flex h-screen w-screen flex-col overflow-hidden bg-slate-200 lg:flex-row">
			<!-- Sidebar -->
			<connectit-ui-navbar [items]="items" #sideBar logo="assets/images/connectit_logo.svg" />
			<!-- Main Container -->
			<div class="flex-1">
				<!-- Top Bar -->
				<connectit-ui-topbar (toggleMenuClick$)="sideBar.toggleCollapse()" />
				<!-- Content -->
				<div class="h-full w-full overflow-scroll p-4">
					<router-outlet></router-outlet>
				</div>
			</div>
		</div>
	`,
})
export class MainLayoutComponent {
	items = [
		{
			label: "Frameworks",
			path: "./frameworks",
			icon: "bi bi-people-fill",
		},
	];
}
