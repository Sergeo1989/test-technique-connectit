import { ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaExceptionFilter } from "./prisma-exception.filter";

function hostFor() {
	const json = jest.fn();
	const status = jest.fn().mockReturnValue({ json });
	const host = {
		switchToHttp: () => ({ getResponse: () => ({ status }) }),
	} as unknown as ArgumentsHost;
	return { host, status, json };
}

const error = (code: string) => new Prisma.PrismaClientKnownRequestError(code, { code, clientVersion: "5" });

describe("PrismaExceptionFilter", () => {
	const filter = new PrismaExceptionFilter();

	it.each([
		["P2002", HttpStatus.CONFLICT],
		["P2003", HttpStatus.BAD_REQUEST],
		["P2025", HttpStatus.NOT_FOUND],
	])("maps %s to %d", (code, expected) => {
		const { host, status } = hostFor();

		filter.catch(error(code), host);

		expect(status).toHaveBeenCalledWith(expected);
	});

	it("falls back to 500 for unknown codes", () => {
		const { host, status } = hostFor();

		filter.catch(error("P2099"), host);

		expect(status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
	});
});
