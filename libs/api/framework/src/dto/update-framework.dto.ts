import { type Framework, type MetadataField, type PrimaryKey } from "@nx-nestjs-angular-starter/database";
import { IsString, IsInt, IsDateString, IsOptional } from "class-validator";

export class UpdateFrameworkDTO implements Omit<Partial<Framework>, PrimaryKey | MetadataField> {
	@IsString()
	@IsOptional()
	name?: string;

	@IsString()
	@IsOptional()
	img?: string;

	@IsInt()
	@IsOptional()
	codingLanguageId?: number;

	@IsInt()
	@IsOptional()
	frameworkTypeId?: number;

	@IsDateString()
	@IsOptional()
	releasedAt?: Date;
}
