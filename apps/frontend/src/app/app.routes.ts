import { Route } from "@angular/router";
import { MainLayoutComponent } from "@nx-nestjs-angular-starter/frontend-shared";
import { FrameworkFormPageComponent } from "./modules/framework/pages/framework-form-page.component";
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
			{
				path: "frameworks/new",
				component: FrameworkFormPageComponent,
			},
			{
				path: "frameworks/:id/edit",
				component: FrameworkFormPageComponent,
			},
		],
	},
	{
		path: "**",
		pathMatch: "full",
		redirectTo: "/app/frameworks",
	},
];
