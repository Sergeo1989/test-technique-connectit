import { Module } from "@nestjs/common";
import { CacheModule, ConfigModule, LoggerModule, PrismaModule } from "@nx-nestjs-angular-starter/connectit-shared-api";
import { ApiFrameworkTypeModule } from "@nx-nestjs-angular-starter/api/framework-type";
import { ApiFrameworkModule } from "@nx-nestjs-angular-starter/api/framework";
import { ApiCodingLanguageModule } from "@nx-nestjs-angular-starter/api/coding-language";

@Module({
	imports: [ConfigModule, LoggerModule, CacheModule, PrismaModule, ApiFrameworkTypeModule, ApiFrameworkModule, ApiCodingLanguageModule],
	providers: [],
})
export class AppModule {}
