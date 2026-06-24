import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { LoggerService } from "../logger/logger.service";

@Module({
	controllers: [],
	providers: [PrismaService, LoggerService],
	exports: [PrismaService],
})
export class PrismaModule {}
