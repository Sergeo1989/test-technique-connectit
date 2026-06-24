import { Directive, EventEmitter, Input, Output } from "@angular/core";

export interface SidebarMenuItem {
	label: string;
	path: string;
	icon?: string;
}

@Directive()
export abstract class BaseSidebarMenuSharedComponent {
	@Input() items: SidebarMenuItem[] = [];
	@Input() collapsed = false;
	@Input() logo?: string;

	@Output() collapse = new EventEmitter<typeof this.collapsed>();
	@Output() itemClick = new EventEmitter<SidebarMenuItem>();

	public handleCollapse() {
		this.collapse.emit(this.collapsed);
	}

	public handleItemClick(item: SidebarMenuItem) {
		this.itemClick.emit(item);
		this.toggleCollapse(true);
	}

	public toggleCollapse(isCollapsed?: boolean) {
		this.collapsed = isCollapsed == null ? !this.collapsed : isCollapsed;
		this.handleCollapse();
	}
}
