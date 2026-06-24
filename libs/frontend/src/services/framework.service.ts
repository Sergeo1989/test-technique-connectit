import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
// type-only: avoids pulling the NestJS barrel runtime into the browser bundle.
import type {
	CreateFrameworkDTO,
	FrameworkQueryDTO,
	ReadOneFramework,
	UpdateFrameworkDTO,
} from "@nx-nestjs-angular-starter/api/framework";
import type { PaginatedResponse } from "@nx-nestjs-angular-starter/database";
import { BaseService } from "@nx-nestjs-angular-starter/connectit-shared-frontend";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
	providedIn: "root",
})
export class FrameworkService extends BaseService<ReadOneFramework, CreateFrameworkDTO, UpdateFrameworkDTO, never> {
	constructor(httpClient: HttpClient) {
		super(`${environment.apiURL}/framework`, httpClient);
	}

	public readPage(query: FrameworkQueryDTO): Observable<PaginatedResponse<ReadOneFramework>> {
		let params = new HttpParams();

		for (const [key, value] of Object.entries(query)) {
			if (value !== undefined && value !== null && value !== "") {
				params = params.set(key, String(value));
			}
		}

		return this.httpClient.get<PaginatedResponse<ReadOneFramework>>(this.baseUrl, { params });
	}
}
