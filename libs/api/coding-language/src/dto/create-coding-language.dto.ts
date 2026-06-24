import { type CodingLanguage, type MetadataField, type PrimaryKey } from "@nx-nestjs-angular-starter/database";
import { IsString } from "class-validator";

export class CreateCodingLanguageDTO implements Omit<CodingLanguage, PrimaryKey | MetadataField> {
	@IsString()
	name!: string;
}
