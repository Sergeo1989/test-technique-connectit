import { Directive, EventEmitter, HostBinding, HostListener, Output } from "@angular/core";

@Directive({
	//eslint-disable-next-line
	selector: "[appDragAndDrop]",
	standalone: true,
})
export class DragAndDropDirective {
	@Output() fileDrop = new EventEmitter<FileList>();
	@HostBinding("class.fileover") fileOver = false;

	@HostListener("dragover", ["$event"]) onDragOver($event: DragEvent) {
		$event.preventDefault();
		$event.stopPropagation();
		this.fileOver = true;
	}

	@HostListener("dragleave", ["$event"]) public onDragLeave($event: DragEvent) {
		$event.preventDefault();
		$event.stopPropagation();
		this.fileOver = false;
	}

	@HostListener("drop", ["$event"]) public ondrop($event: DragEvent) {
		$event.preventDefault();
		$event.stopPropagation();

		this.fileOver = false;
		const files = $event.dataTransfer?.files;
		this.fileDrop.emit(files);
	}
}
