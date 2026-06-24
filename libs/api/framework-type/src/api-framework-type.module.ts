import { Module } from "@nestjs/common";
import { LoggerModule, PrismaModule } from "@nx-nestjs-angular-starter/connectit-shared-api";
import { ApiFrameworkTypeController } from "./api-framework-type.controller";
import { ApiFrameworkTypeService } from "./api-framework-type.service";

@Module({
	imports: [PrismaModule, LoggerModule],
	controllers: [ApiFrameworkTypeController],
	providers: [ApiFrameworkTypeService],
	exports: [ApiFrameworkTypeService],
})
export class ApiFrameworkTypeModule {}
