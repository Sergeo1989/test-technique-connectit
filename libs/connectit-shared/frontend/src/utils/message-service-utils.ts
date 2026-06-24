export function errorMessage(
	detail?: string,
	summary = "Une erreur est survenue"
): { icon: "pi pi-times"; severity: "error"; summary: string; detail: string } {
	return {
		icon: "pi pi-times",
		severity: "error",
		summary: summary,
		detail: detail ?? "",
	};
}

export function successMessage(
	detail: string,
	summary = "Succès"
): { icon: "pi pi-check"; severity: "success"; summary: string; detail: string } {
	return {
		icon: "pi pi-check",
		severity: "success",
		summary: summary,
		detail: detail,
	};
}
