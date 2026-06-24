/* eslint-disable @angular-eslint/directive-selector */
import { DOCUMENT } from "@angular/common";
import {
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	Inject,
	Input,
	Output,
	Renderer2,
	type OnDestroy,
	type OnInit,
} from "@angular/core";
import { Subject, debounceTime, type Subscription } from "rxjs";

type CButtonColor = "primary" | "secondary" | "clear" | "danger";
type CButtonSize = "sm" | "md" | "lg";

@Directive({
	selector: "button[cButton]",
	standalone: true,
	exportAs: "cButton",
})
export class CButtonDirective implements OnInit, OnDestroy {
	private readonly baseClass = "c-button";
	private readonly classList: DOMTokenList;
	private iconElement: HTMLElement;
	private labelElement: HTMLElement;

	private _cButtonIcon: string | null = null;
	private _cButtonLoading = false;
	private _cButtonColor: CButtonColor = "primary";
	private _cButtonSize: CButtonSize = "md";

	private get isDebounceEnabled() {
		return this.cButtonDebounceMs != null && Number.isFinite(this.cButtonDebounceMs) && this.cButtonDebounceMs > 0;
	}

	/** The label of the button */
	@Input() public set cButtonLabel(label: string) {
		this.handleLabelChanges(label);
	}

	/** The color style of the button */
	@Input() public set cButtonColor(color: CButtonColor) {
		const base = `${this.baseClass}-color-`;

		this.classList.remove(`${base}${this._cButtonColor}`);
		this.classList.add(`${base}${color}`);

		this._cButtonColor = color;
	}

	/** The size of the button */
	@Input() public set cButtonSize(size: CButtonSize) {
		const base = `${this.baseClass}-size-`;

		this.classList.remove(`${base}${this._cButtonSize}`);
		this.classList.add(`${base}${size}`);

		this._cButtonSize = size;
	}

	@Input() public set cButtonLoading(isLoading: boolean | undefined) {
		const isButtonLoading = isLoading || false;
		this._cButtonLoading = isButtonLoading;

		this.elementRef.nativeElement.disabled = isButtonLoading;

		this.refreshIcon();
	}

	@Input() public set cButtonIcon(icon: string) {
		this._cButtonIcon = icon;
		this.refreshIcon();
	}

	@Input() public cButtonDebounceMs: number | undefined;

	@Output() debounceClick = new EventEmitter<MouseEvent>();
	private clicks = new Subject<MouseEvent>();
	private subscription!: Subscription;

	private get displayedIcon() {
		if (this._cButtonLoading) return "bi bi-arrow-clockwise animate-spin inline-block";
		if (this._cButtonIcon) return this._cButtonIcon;
		return null;
	}

	public constructor(
		private elementRef: ElementRef<HTMLButtonElement>,
		private renderer: Renderer2,
		@Inject(DOCUMENT) private document: Document
	) {
		this.classList = elementRef.nativeElement.classList;

		this.iconElement = this.document.createElement("i");
		this.labelElement = this.document.createElement("span");
	}

	public ngOnInit() {
		this.classList.add(this.baseClass);

		this.cButtonColor = this._cButtonColor;
		this.cButtonSize = this._cButtonSize;

		this.subscription = this.clicks
			.pipe(debounceTime(this.cButtonDebounceMs || 0))
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.subscribe(e => this.debounceClick.emit(e));
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	@HostListener("click", ["$event"])
	clickEvent(event: MouseEvent) {
		if (!this.isDebounceEnabled) return;
		event.preventDefault();
		event.stopPropagation();
		this.clicks.next(event);
	}

	private refreshIcon() {
		// Update the css classes of the icon html element.
		this.iconElement.className = this.displayedIcon || "";

		if (!this.displayedIcon) {
			// If there's no currentIcon to display, remove node.
			this.renderer.removeChild(this.elementRef.nativeElement, this.iconElement);
		} else if (!this.iconElement.parentElement) {
			// If the icon element does not already exist, append it the button.
			this.renderer.appendChild(this.elementRef.nativeElement, this.iconElement);
		}
	}

	private handleLabelChanges(label: string) {
		const removeLabel = !label;
		const isLabelCurrentlyDisplayed = this.elementRef.nativeElement.contains(this.labelElement);
		this.labelElement.textContent = label;

		if (removeLabel) {
			this.renderer.removeChild(this.elementRef.nativeElement, this.labelElement);
		} else if (!isLabelCurrentlyDisplayed) {
			this.renderer.appendChild(this.elementRef.nativeElement, this.labelElement);
		}
	}
}
