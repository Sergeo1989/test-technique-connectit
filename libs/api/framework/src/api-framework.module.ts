import { Module } from "@nestjs/common";
import { LoggerModule, PrismaModule } from "@nx-nestjs-angular-starter/connectit-shared-api";
import { ApiFrameworkController } from "./api-framework.controller";
import { ApiFrameworkService } from "./api-framework.service";

@Module({
	imports: [PrismaModule, LoggerModule],
	controllers: [ApiFrameworkController],
	providers: [ApiFrameworkService],
	exports: [ApiFrameworkService],
})
export class ApiFrameworkModule {}
