/* eslint-disable @angular-eslint/component-selector */
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PrimeNGConfig } from "primeng/api";
import { ToastModule } from "primeng/toast";

@Component({
	imports: [RouterModule, CommonModule, ToastModule],
	selector: "app-root",
	standalone: true,
	template: `
		<p-toast></p-toast>
		<router-outlet></router-outlet>
	`,
})
export class AppComponent {
	public constructor(private readonly primeNGConfig: PrimeNGConfig) {
		this.primeNGConfig.setTranslation({
			dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
			dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
			dayNamesMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
			monthNames: [
				"Janvier",
				"Février",
				"Mars",
				"Avril",
				"Mai",
				"Juin",
				"Juillet",
				"Août",
				"Septembre",
				"Octobre",
				"Novembre",
				"Décembre",
			],
			monthNamesShort: ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],
			today: "Aujourd'hui",
		});
	}
}
