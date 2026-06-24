import { CommonModule } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	SimpleChanges,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
// type-only: keep the NestJS barrel out of the browser bundle.
import type { ReadOneFramework } from "@nx-nestjs-angular-starter/api/framework";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import type { TableLazyLoadEvent } from "primeng/table";
import { TableModule } from "primeng/table";
import { Subject } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";
import { EMPTY_FILTERS, FrameworkFilters, FrameworkTableLoad, SelectOption } from "../../models/framework-table.model";

const NAME_DEBOUNCE_MS = 300;

@Component({
	selector: "app-framework-table",
	standalone: true,
	imports: [CommonModule, FormsModule, TableModule, DropdownModule, InputTextModule],
	templateUrl: "./framework-table.component.html",
	styleUrl: "./framework-table.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameworkTableComponent implements OnInit, OnChanges, OnDestroy {
	@Input() frameworks: ReadOneFramework[] = [];
	@Input() total = 0;
	@Input() loading = false;
	@Input() first = 0;
	@Input() rows = 10;
	@Input() sortField?: string;
	@Input() sortOrder = 1;
	@Input() filters: FrameworkFilters = { ...EMPTY_FILTERS };
	@Input() languageOptions: SelectOption[] = [];
	@Input() typeOptions: SelectOption[] = [];

	@Output() loadRequest = new EventEmitter<FrameworkTableLoad>();
	@Output() filtersChange = new EventEmitter<FrameworkFilters>();
	@Output() clearRequest = new EventEmitter<void>();
	@Output() rowClick = new EventEmitter<ReadOneFramework>();

	model: FrameworkFilters = { ...EMPTY_FILTERS };

	private readonly nameInput$ = new Subject<string>();
	private readonly destroy$ = new Subject<void>();

	ngOnInit() {
		this.nameInput$
			.pipe(debounceTime(NAME_DEBOUNCE_MS), takeUntil(this.destroy$))
			.subscribe(() => this.emitFilters());
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes["filters"] && this.filters) {
			this.model = { ...this.filters };
		}
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	get hasActiveFilters(): boolean {
		return !!this.model.name || this.model.codingLanguageId != null || this.model.frameworkTypeId != null;
	}

	onLazyLoad(event: TableLazyLoadEvent) {
		this.loadRequest.emit({
			first: event.first ?? 0,
			rows: event.rows ?? this.rows,
			sortField: (event.sortField as string) || undefined,
			sortOrder: event.sortOrder ?? 1,
		});
	}

	onNameInput(value: string) {
		this.model.name = value;
		this.nameInput$.next(value);
	}

	onDropdownChange() {
		this.emitFilters();
	}

	clearFilters() {
		this.clearRequest.emit();
	}

	onImgError(event: Event) {
		(event.target as HTMLImageElement).style.display = "none";
	}

	private emitFilters() {
		this.filtersChange.emit({ ...this.model });
	}
}
