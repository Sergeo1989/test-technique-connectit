import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { FrameworkFormValue } from "../models/framework-form.model";
import { FrameworkFormPageComponent } from "./framework-form-page.component";

const FRAMEWORK = {
	id: 5,
	name: "React",
	img: "x",
	codingLanguageId: 2,
	frameworkTypeId: 1,
	releasedAt: "2013-05-29T00:00:00.000Z",
};

const VALUE: FrameworkFormValue = {
	name: "Solid",
	img: "y",
	codingLanguageId: 3,
	frameworkTypeId: 1,
	releasedAt: new Date("2020-01-01T00:00:00.000Z"),
};

function setup(idParam: string | null) {
	const frameworkService = {
		readOne: jest.fn().mockReturnValue(of(FRAMEWORK)),
		create: jest.fn().mockResolvedValue({ id: 1 }),
		update: jest.fn().mockResolvedValue({ id: 5 }),
	};
	const frameworkOptions = {
		getLanguageOptions: jest.fn().mockReturnValue(of([{ label: "JS", value: 2 }])),
		getTypeOptions: jest.fn().mockReturnValue(of([{ label: "Frontend", value: 1 }])),
	};
	const router = { navigate: jest.fn() } as unknown as Router;
	const route = { snapshot: { paramMap: { get: () => idParam } } } as unknown as ActivatedRoute;
	const topbarService = { setHeader: jest.fn() };

	const component = new FrameworkFormPageComponent(
		frameworkService as never,
		frameworkOptions as never,
		router,
		route,
		topbarService as never
	);

	return { component, frameworkService, router, topbarService };
}

describe("FrameworkFormPageComponent (container)", () => {
	describe("create mode", () => {
		it("sets the create header, loads options and does not fetch a framework", () => {
			const { component, frameworkService, topbarService } = setup(null);

			component.ngOnInit();

			expect(topbarService.setHeader).toHaveBeenCalledWith("Nouveau framework");
			expect(component.languageOptions).toEqual([{ label: "JS", value: 2 }]);
			expect(frameworkService.readOne).not.toHaveBeenCalled();
		});

		it("creates then redirects to the list on save", async () => {
			const { component, frameworkService, router } = setup(null);
			component.ngOnInit();

			await component.onSave(VALUE);

			expect(frameworkService.create).toHaveBeenCalledWith(VALUE);
			expect(frameworkService.update).not.toHaveBeenCalled();
			expect(router.navigate).toHaveBeenCalledWith(["/app/frameworks"]);
		});
	});

	describe("edit mode", () => {
		it("sets the edit header and loads the framework", () => {
			const { component, frameworkService, topbarService } = setup("5");

			component.ngOnInit();

			expect(topbarService.setHeader).toHaveBeenCalledWith("Modifier le framework");
			expect(frameworkService.readOne).toHaveBeenCalledWith(5, { source: "server-only" });
			expect(component.framework).toEqual(FRAMEWORK);
		});

		it("updates then redirects to the list on save", async () => {
			const { component, frameworkService, router } = setup("5");
			component.ngOnInit();

			await component.onSave(VALUE);

			expect(frameworkService.update).toHaveBeenCalledWith(5, VALUE);
			expect(frameworkService.create).not.toHaveBeenCalled();
			expect(router.navigate).toHaveBeenCalledWith(["/app/frameworks"]);
		});
	});
});
