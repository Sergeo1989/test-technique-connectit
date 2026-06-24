import { FrameworkFormValue } from "../../models/framework-form.model";
import { FrameworkFormComponent } from "./framework-form.component";

const FRAMEWORK = {
	id: 5,
	name: "React",
	img: "https://cdn.simpleicons.org/react",
	codingLanguageId: 2,
	frameworkTypeId: 1,
	releasedAt: "2013-05-29T00:00:00.000Z",
} as never;

describe("FrameworkFormComponent (presentational)", () => {
	let component: FrameworkFormComponent;

	beforeEach(() => {
		component = new FrameworkFormComponent();
	});

	it("is invalid and does not emit save when empty", () => {
		const saves: FrameworkFormValue[] = [];
		component.save.subscribe(v => saves.push(v));

		component.onSubmit();

		expect(saves).toEqual([]);
		expect(component.form.touched).toBe(true);
	});

	it("prefills the form from the framework input (releasedAt becomes a Date)", () => {
		component.framework = FRAMEWORK;
		component.ngOnChanges({ framework: { currentValue: FRAMEWORK } as never });

		expect(component.form.value.name).toBe("React");
		expect(component.form.value.codingLanguageId).toBe(2);
		expect(component.form.controls.releasedAt.value).toBeInstanceOf(Date);
	});

	it("emits save with the form value when valid", () => {
		const saves: FrameworkFormValue[] = [];
		component.save.subscribe(v => saves.push(v));
		const releasedAt = new Date("2020-01-01T00:00:00.000Z");

		component.form.setValue({
			name: "Solid",
			img: "https://cdn.simpleicons.org/solid",
			codingLanguageId: 3,
			frameworkTypeId: 1,
			releasedAt,
		});
		component.onSubmit();

		expect(saves).toEqual([
			{
				name: "Solid",
				img: "https://cdn.simpleicons.org/solid",
				codingLanguageId: 3,
				frameworkTypeId: 1,
				releasedAt,
			},
		]);
	});

	it("emits cancel", () => {
		let cancelled = 0;
		component.cancel.subscribe(() => cancelled++);

		component.onCancel();

		expect(cancelled).toBe(1);
	});
});
