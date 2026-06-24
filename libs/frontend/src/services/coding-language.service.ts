import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
	CreateCodingLanguageDTO,
	ReadOneCodingLanguage,
	UpdateCodingLanguageDTO,
} from "@nx-nestjs-angular-starter/api/coding-language";
import { BaseService } from "@nx-nestjs-angular-starter/connectit-shared-frontend";
import { environment } from "../environments/environment";

@Injectable({
	providedIn: "root",
})
export class CodingLanguageService extends BaseService<
	ReadOneCodingLanguage,
	CreateCodingLanguageDTO,
	UpdateCodingLanguageDTO,
	never
> {
	constructor(httpClient: HttpClient) {
		super(`${environment.apiURL}/CodingLanguage`, httpClient);
	}

	// Example of a request that does not exist in BaseService
	// public exampleRequest(employeeId: Employee["id"], data: ExampleRequestDataDTO) {
	// 	return firstValueFrom(
	// 		this.httpClient
	// 			.patch<ReadOneEmployee | null>(`${this.baseUrl}/${employeeId}/example-request`, data)
	// 			.pipe(tap(employee => employee && this.saveToCache(employee)))
	// 	);
	// }
}
