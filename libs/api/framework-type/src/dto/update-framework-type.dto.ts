import { type FrameworkType, type PrimaryKey } from "@nx-nestjs-angular-starter/database";
import { IsString, IsOptional } from "class-validator";

export class UpdateFrameworkTypeDTO implements Omit<Partial<FrameworkType>, PrimaryKey> {
	@IsString()
	@IsOptional()
	name?: string;
}
