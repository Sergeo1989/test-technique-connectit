import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { type Response } from "express";

const MAPPING: Record<string, { status: number; message: string }> = {
	P2002: { status: HttpStatus.CONFLICT, message: "A resource with this unique value already exists" },
	P2003: { status: HttpStatus.BAD_REQUEST, message: "A referenced resource does not exist" },
	P2025: { status: HttpStatus.NOT_FOUND, message: "Resource not found" },
};

const FALLBACK = { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" };

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
	catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse<Response>();
		const { status, message } = MAPPING[exception.code] ?? FALLBACK;

		response.status(status).json({ statusCode: status, message, error: exception.code });
	}
}
