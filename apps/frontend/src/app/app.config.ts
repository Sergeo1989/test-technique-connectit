import { registerLocaleData } from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
import localeFrCA from "@angular/common/locales/fr-CA";
import { ApplicationConfig, LOCALE_ID } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withEnabledBlockingInitialNavigation } from "@angular/router";
import {
	CodingLanguageService,
	FrameworkService,
	FrameworkTypeService,
	TopbarService,
} from "@nx-nestjs-angular-starter/frontend-shared";
import { MessageService } from "primeng/api";
import { appRoutes } from "./app.routes";
registerLocaleData(localeFrCA, "fr-CA");

export const appConfig: ApplicationConfig = {
	providers: [
		FrameworkService,
		CodingLanguageService,
		FrameworkTypeService,
		provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
		provideHttpClient(),
		provideAnimations(),
		{ provide: LOCALE_ID, useValue: "fr-CA" },
		MessageService,
		TopbarService,
	],
};
