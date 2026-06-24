import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { ListFrameworkPageComponent } from "./list-framework-page.component";

function queryParamMap(params: Record<string, string>) {
	return { get: (key: string) => (key in params ? params[key] : null) };
}

function setup(urlParams: Record<string, string> = {}) {
	const frameworkService = {
		readPage: jest.fn().mockReturnValue(of({ data: [{ id: 1 }], total: 1, page: 1, pageSize: 10 })),
	};
	const codingLanguageService = { readAll: jest.fn().mockReturnValue(of([{ id: 2, name: "JS" }])) };
	const frameworkTypeService = { readAll: jest.fn().mockReturnValue(of([{ id: 1, name: "Frontend" }])) };
	const router = { navigate: jest.fn() } as unknown as Router;
	const route = { snapshot: { queryParamMap: queryParamMap(urlParams) } } as unknown as ActivatedRoute;
	const topbarService = { setHeader: jest.fn() };

	const component = new ListFrameworkPageComponent(
		frameworkService as never,
		codingLanguageService as never,
		frameworkTypeService as never,
		router,
		route,
		topbarService as never
	);

	return { component, frameworkService, codingLanguageService, router };
}

describe("ListFrameworkPageComponent (container)", () => {
	it("restores pagination, filters and sort from the URL on init", () => {
		const { component, codingLanguageService } = setup({
			page: "2",
			pageSize: "20",
			name: "Re",
			codingLanguageId: "3",
			frameworkTypeId: "1",
			sortBy: "name",
			sortOrder: "desc",
		});

		component.ngOnInit();

		expect(component.rows).toBe(20);
		expect(component.first).toBe(20);
		expect(component.filters).toEqual({ name: "Re", codingLanguageId: 3, frameworkTypeId: 1 });
		expect(component.sortField).toBe("name");
		expect(component.sortOrder).toBe(-1);
		expect(codingLanguageService.readAll).toHaveBeenCalled();
	});

	it("loads the page on a table load event and maps the result", () => {
		const { component, frameworkService } = setup();

		component.onLoad({ first: 10, rows: 10, sortOrder: 1 });

		expect(frameworkService.readPage).toHaveBeenCalledWith(
			expect.objectContaining({ page: 2, pageSize: 10 })
		);
		expect(component.frameworks).toEqual([{ id: 1 }]);
		expect(component.total).toBe(1);
		expect(component.loading).toBe(false);
	});

	it("sends filters in the query and resets to the first page on filter change", () => {
		const { component, frameworkService } = setup();
		component.first = 50;

		component.onFiltersChange({ name: "Vue", codingLanguageId: 2, frameworkTypeId: 1 });

		expect(component.first).toBe(0);
		expect(frameworkService.readPage).toHaveBeenCalledWith(
			expect.objectContaining({ page: 1, name: "Vue", codingLanguageId: 2, frameworkTypeId: 1 })
		);
	});

	it("persists the active query to the URL", () => {
		const { component, router } = setup();

		component.onFiltersChange({ name: "Re", codingLanguageId: null, frameworkTypeId: null });

		expect(router.navigate).toHaveBeenCalledWith(
			[],
			expect.objectContaining({
				queryParams: expect.objectContaining({ page: 1, name: "Re" }),
				queryParamsHandling: "merge",
				replaceUrl: true,
			})
		);
	});

	it("clears all filters", () => {
		const { component, frameworkService } = setup();
		component.filters = { name: "Re", codingLanguageId: 3, frameworkTypeId: 1 };

		component.clearFilters();

		expect(component.filters).toEqual({ name: "", codingLanguageId: null, frameworkTypeId: null });
		expect(frameworkService.readPage).toHaveBeenCalledWith(
			expect.not.objectContaining({ name: expect.anything() })
		);
	});
});
