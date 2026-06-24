import { Injectable } from "@nestjs/common";
import { ConfigService as NestJSConfigService } from "@nestjs/config";

type EnvironmentKeys = "PORT" | "ENVIRONMENT";

@Injectable()
export class ConfigService {
	constructor(private configService: NestJSConfigService) {}

	get(key: EnvironmentKeys) {
		return this.configService.get<string | undefined>(key);
	}

	get isProduction() {
		return this.configService.get<string>("ENVIRONMENT") === "PROD";
	}

	get isQA() {
		return this.configService.get<string>("ENVIRONMENT") === "QA";
	}
}
