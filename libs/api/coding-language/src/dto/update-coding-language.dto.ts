import { type CodingLanguage, type MetadataField, type PrimaryKey } from "@nx-nestjs-angular-starter/database";
import { IsString, IsOptional } from "class-validator";

export class UpdateCodingLanguageDTO implements Omit<Partial<CodingLanguage>, PrimaryKey | MetadataField> {
	@IsString()
	@IsOptional()
	name?: string;
}
