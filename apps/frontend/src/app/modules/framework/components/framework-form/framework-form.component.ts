import { CommonModule } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
// type-only: keep the NestJS barrel out of the browser bundle.
import type { ReadOneFramework } from "@nx-nestjs-angular-starter/api/framework";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { FrameworkFormValue } from "../../models/framework-form.model";
import { SelectOption } from "../../models/framework-table.model";

@Component({
	selector: "app-framework-form",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, InputTextModule, DropdownModule, CalendarModule, ButtonModule],
	templateUrl: "./framework-form.component.html",
	styleUrl: "./framework-form.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameworkFormComponent implements OnChanges {
	@Input() framework: ReadOneFramework | null = null;
	@Input() languageOptions: SelectOption[] = [];
	@Input() typeOptions: SelectOption[] = [];
	@Input() submitting = false;

	@Output() save = new EventEmitter<FrameworkFormValue>();
	@Output() cancel = new EventEmitter<void>();

	readonly form = new FormGroup({
		name: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
		img: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
		codingLanguageId: new FormControl<number | null>(null, { validators: [Validators.required] }),
		frameworkTypeId: new FormControl<number | null>(null, { validators: [Validators.required] }),
		releasedAt: new FormControl<Date | null>(null, { validators: [Validators.required] }),
	});

	ngOnChanges(changes: SimpleChanges) {
		if (changes["framework"] && this.framework) {
			this.form.patchValue({
				name: this.framework.name,
				img: this.framework.img,
				codingLanguageId: this.framework.codingLanguageId,
				frameworkTypeId: this.framework.frameworkTypeId,
				releasedAt: new Date(this.framework.releasedAt),
			});
		}
	}

	isInvalid(field: keyof typeof this.form.controls): boolean {
		const control = this.form.controls[field];
		return control.invalid && control.touched;
	}

	onSubmit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const { name, img, codingLanguageId, frameworkTypeId, releasedAt } = this.form.getRawValue();
		if (codingLanguageId == null || frameworkTypeId == null || releasedAt == null) {
			return;
		}

		this.save.emit({ name, img, codingLanguageId, frameworkTypeId, releasedAt });
	}

	onCancel() {
		this.cancel.emit();
	}
}
