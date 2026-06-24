import { Route } from "@angular/router";
import { MainLayoutComponent } from "@nx-nestjs-angular-starter/frontend-shared";
import { ListFrameworkPageComponent } from "./modules/framework/pages/list-framework-page.component";

export const appRoutes: Route[] = [
	{
		path: "app",
		component: MainLayoutComponent,
		children: [
			{
				path: "frameworks",
				component: ListFrameworkPageComponent,
			},
		],
	},
	{
		path: "**",
		pathMatch: "full",
		redirectTo: "/app/frameworks",
	},
];
