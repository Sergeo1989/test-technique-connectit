import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// type-only: keep the NestJS barrel out of the browser bundle.
import type {
	FrameworkQueryDTO,
	FrameworkSortBy,
	ReadOneFramework,
	SortOrder,
} from "@nx-nestjs-angular-starter/api/framework";
import { FrameworkService, TopbarService } from "@nx-nestjs-angular-starter/frontend-shared";
import { FrameworkTableComponent } from "../components/framework-table/framework-table.component";
import { FrameworkOptionsService } from "../services/framework-options.service";
import {
	EMPTY_FILTERS,
	FrameworkFilters,
	FrameworkTableLoad,
	SelectOption,
} from "../models/framework-table.model";

const DEFAULT_ROWS = 10;

@Component({
	selector: "app-list-framework-page",
	standalone: true,
	imports: [FrameworkTableComponent],
	templateUrl: "./list-framework-page.component.html",
})
export class ListFrameworkPageComponent implements OnInit {
	frameworks: ReadOneFramework[] = [];
	total = 0;
	// Starts true: the first lazy load fires during change detection (avoids NG0100).
	loading = true;

	first = 0;
	rows = DEFAULT_ROWS;
	sortField?: string;
	sortOrder = 1;

	filters: FrameworkFilters = { ...EMPTY_FILTERS };

	languageOptions: SelectOption[] = [];
	typeOptions: SelectOption[] = [];

	constructor(
		private frameworkService: FrameworkService,
		private frameworkOptions: FrameworkOptionsService,
		private router: Router,
		private route: ActivatedRoute,
		topbarService: TopbarService
	) {
		topbarService.setHeader("Frameworks");
	}

	ngOnInit() {
		this.restoreStateFromUrl();
		this.loadDropdownOptions();
	}

	onLoad(event: FrameworkTableLoad) {
		this.first = event.first;
		this.rows = event.rows;
		this.sortField = event.sortField;
		this.sortOrder = event.sortOrder;
		this.loadFrameworks();
	}

	onFiltersChange(filters: FrameworkFilters) {
		this.filters = filters;
		this.first = 0;
		this.loadFrameworks();
	}

	clearFilters() {
		this.filters = { ...EMPTY_FILTERS };
		this.first = 0;
		this.loadFrameworks();
	}

	goToCreate() {
		this.router.navigate(["/app/frameworks/new"]);
	}

	goToEdit(framework: ReadOneFramework) {
		this.router.navigate(["/app/frameworks", framework.id, "edit"]);
	}

	private restoreStateFromUrl() {
		const q = this.route.snapshot.queryParamMap;
		this.rows = Number(q.get("pageSize")) || DEFAULT_ROWS;
		const page = Number(q.get("page")) || 1;
		this.first = (page - 1) * this.rows;
		this.sortField = q.get("sortBy") ?? undefined;
		this.sortOrder = q.get("sortOrder") === "desc" ? -1 : 1;
		this.filters = {
			name: q.get("name") ?? "",
			codingLanguageId: q.get("codingLanguageId") ? Number(q.get("codingLanguageId")) : null,
			frameworkTypeId: q.get("frameworkTypeId") ? Number(q.get("frameworkTypeId")) : null,
		};
	}

	private loadDropdownOptions() {
		this.frameworkOptions.getLanguageOptions().subscribe(options => (this.languageOptions = options));
		this.frameworkOptions.getTypeOptions().subscribe(options => (this.typeOptions = options));
	}

	private buildQuery(): FrameworkQueryDTO {
		const query: FrameworkQueryDTO = {
			page: Math.floor(this.first / this.rows) + 1,
			pageSize: this.rows,
		};

		if (this.filters.name) query.name = this.filters.name;
		if (this.filters.codingLanguageId != null) query.codingLanguageId = this.filters.codingLanguageId;
		if (this.filters.frameworkTypeId != null) query.frameworkTypeId = this.filters.frameworkTypeId;
		if (this.sortField) {
			query.sortBy = this.sortField as FrameworkSortBy;
			query.sortOrder = (this.sortOrder === -1 ? "desc" : "asc") as SortOrder;
		}

		return query;
	}

	private loadFrameworks() {
		const query = this.buildQuery();
		this.loading = true;

		this.frameworkService.readPage(query).subscribe({
			next: result => {
				this.frameworks = result.data;
				this.total = result.total;
				this.loading = false;
			},
			error: () => (this.loading = false),
		});

		this.syncUrl(query);
	}

	private syncUrl(query: FrameworkQueryDTO) {
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: {
				page: query.page,
				pageSize: query.pageSize,
				name: query.name ?? null,
				codingLanguageId: query.codingLanguageId ?? null,
				frameworkTypeId: query.frameworkTypeId ?? null,
				sortBy: query.sortBy ?? null,
				sortOrder: query.sortBy ? query.sortOrder : null,
			},
			queryParamsHandling: "merge",
			replaceUrl: true,
		});
	}
}
