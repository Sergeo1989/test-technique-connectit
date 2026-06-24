export interface SelectOption {
	label: string;
	value: number;
}

export interface FrameworkFilters {
	name: string;
	codingLanguageId: number | null;
	frameworkTypeId: number | null;
}

export interface FrameworkTableLoad {
	first: number;
	rows: number;
	sortField?: string;
	sortOrder: number;
}

export const EMPTY_FILTERS: FrameworkFilters = {
	name: "",
	codingLanguageId: null,
	frameworkTypeId: null,
};
