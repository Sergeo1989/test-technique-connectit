import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class TopbarService {
	private _header = new BehaviorSubject<string>("");

	public getHeader() {
		return this._header.asObservable();
	}

	public setHeader(title: string) {
		this._header.next(title);
	}
}
