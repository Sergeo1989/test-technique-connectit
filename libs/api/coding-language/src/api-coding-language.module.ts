import { Module } from "@nestjs/common";
import { LoggerModule, PrismaModule } from "@nx-nestjs-angular-starter/connectit-shared-api";
import { ApiCodingLanguageController } from "./api-coding-language.controller";
import { ApiCodingLanguageService } from "./api-coding-language.service";

@Module({
	imports: [PrismaModule, LoggerModule],
	controllers: [ApiCodingLanguageController],
	providers: [ApiCodingLanguageService],
	exports: [ApiCodingLanguageService],
})
export class ApiCodingLanguageModule {}
