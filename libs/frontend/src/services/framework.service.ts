import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateFrameworkDTO, ReadOneFramework, UpdateFrameworkDTO } from "@nx-nestjs-angular-starter/api/framework";
import { BaseService } from "@nx-nestjs-angular-starter/connectit-shared-frontend";
import { environment } from "../environments/environment";

@Injectable({
	providedIn: "root",
})
export class FrameworkService extends BaseService<ReadOneFramework, CreateFrameworkDTO, UpdateFrameworkDTO, never> {
	constructor(httpClient: HttpClient) {
		super(`${environment.apiURL}/framework`, httpClient);
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
