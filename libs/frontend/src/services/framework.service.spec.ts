import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { PaginatedResponse } from "@nx-nestjs-angular-starter/database";
import { environment } from "../environments/environment";
import { FrameworkService } from "./framework.service";

const BASE = `${environment.apiURL}/framework`;

describe("FrameworkService.readPage", () => {
	let service: FrameworkService;
	let http: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [FrameworkService, provideHttpClient(), provideHttpClientTesting()],
		});
		service = TestBed.inject(FrameworkService);
		http = TestBed.inject(HttpTestingController);
	});

	afterEach(() => http.verify());

	it("sends every provided query param and returns the paginated body", () => {
		const body: PaginatedResponse<never> = { data: [], total: 0, page: 2, pageSize: 5 };
		let received: PaginatedResponse<unknown> | undefined;

		service
			.readPage({ page: 2, pageSize: 5, name: "Re", codingLanguageId: 3, frameworkTypeId: 1 })
			.subscribe(r => (received = r));

		const req = http.expectOne(r => r.url === BASE);
		expect(req.request.method).toBe("GET");
		expect(req.request.params.get("page")).toBe("2");
		expect(req.request.params.get("pageSize")).toBe("5");
		expect(req.request.params.get("name")).toBe("Re");
		expect(req.request.params.get("codingLanguageId")).toBe("3");
		expect(req.request.params.get("frameworkTypeId")).toBe("1");

		req.flush(body);
		expect(received).toEqual(body);
	});

	it("omits undefined, null and empty-string params", () => {
		service
			.readPage({ page: 1, pageSize: 10, name: "", codingLanguageId: undefined })
			.subscribe();

		const req = http.expectOne(r => r.url === BASE);
		expect(req.request.params.has("name")).toBe(false);
		expect(req.request.params.has("codingLanguageId")).toBe(false);
		expect(req.request.params.get("page")).toBe("1");
		expect(req.request.params.get("pageSize")).toBe("10");

		req.flush({ data: [], total: 0, page: 1, pageSize: 10 });
	});
});
