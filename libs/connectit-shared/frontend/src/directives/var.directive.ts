import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

type VarDirectiveContext<T> = {
	$implicit: T;
	ngVar: T;
};

@Directive({
	//eslint-disable-next-line
	selector: "[ngVar]",
	standalone: true,
})
export class VarDirective<T> {
	private readonly context: VarDirectiveContext<T> = {
		$implicit: null as T,
		ngVar: null as T,
	};
	private hasView = false;

	@Input()
	public set ngVar(context: T) {
		this.context.$implicit = context;
		this.context.ngVar = context;

		if (this.hasView) {
			return;
		}

		this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
		this.hasView = true;
	}

	public constructor(
		private readonly templateRef: TemplateRef<VarDirectiveContext<T>>,
		private readonly viewContainerRef: ViewContainerRef
	) {}

	public static ngTemplateContextGuard<T>(
		_directive: VarDirective<T>,
		_context: unknown
	): _context is VarDirectiveContext<T> {
		return true;
	}
}
