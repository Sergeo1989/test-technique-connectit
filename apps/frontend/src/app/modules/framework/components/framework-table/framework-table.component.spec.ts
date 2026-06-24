import { fakeAsync, tick } from "@angular/core/testing";
import { FrameworkFilters, FrameworkTableLoad } from "../../models/framework-table.model";
import { FrameworkTableComponent } from "./framework-table.component";

describe("FrameworkTableComponent (presentational)", () => {
	let component: FrameworkTableComponent;

	beforeEach(() => {
		component = new FrameworkTableComponent();
	});

	afterEach(() => component.ngOnDestroy());

	it("maps a PrimeNG lazy event to a framework-agnostic load request", () => {
		const loads: FrameworkTableLoad[] = [];
		component.loadRequest.subscribe(e => loads.push(e));

		component.onLazyLoad({ first: 20, rows: 10, sortField: "name", sortOrder: -1 });

		expect(loads).toEqual([{ first: 20, rows: 10, sortField: "name", sortOrder: -1 }]);
	});

	it("syncs its local model from the filters input", () => {
		component.filters = { name: "Re", codingLanguageId: 3, frameworkTypeId: null };
		component.ngOnChanges({ filters: { currentValue: component.filters } as never });

		expect(component.model).toEqual({ name: "Re", codingLanguageId: 3, frameworkTypeId: null });
	});

	it("emits filtersChange immediately on a dropdown change", () => {
		const emitted: FrameworkFilters[] = [];
		component.filtersChange.subscribe(f => emitted.push(f));
		component.model = { name: "", codingLanguageId: 5, frameworkTypeId: null };

		component.onDropdownChange();

		expect(emitted).toEqual([{ name: "", codingLanguageId: 5, frameworkTypeId: null }]);
	});

	it("debounces the name input before emitting filtersChange", fakeAsync(() => {
		const emitted: FrameworkFilters[] = [];
		component.ngOnInit();
		component.filtersChange.subscribe(f => emitted.push(f));

		component.onNameInput("R");
		component.onNameInput("Re");
		expect(emitted).toEqual([]);

		tick(300);

		expect(emitted).toEqual([{ name: "Re", codingLanguageId: null, frameworkTypeId: null }]);
	}));

	it("flags active filters only when at least one is set", () => {
		component.model = { name: "", codingLanguageId: null, frameworkTypeId: null };
		expect(component.hasActiveFilters).toBe(false);

		component.model = { name: "Re", codingLanguageId: null, frameworkTypeId: null };
		expect(component.hasActiveFilters).toBe(true);

		component.model = { name: "", codingLanguageId: 2, frameworkTypeId: null };
		expect(component.hasActiveFilters).toBe(true);
	});

	it("emits clear when the reset button is used", () => {
		const clears: void[] = [];
		component.clearRequest.subscribe(() => clears.push(undefined));

		component.clearFilters();

		expect(clears.length).toBe(1);
	});
});
