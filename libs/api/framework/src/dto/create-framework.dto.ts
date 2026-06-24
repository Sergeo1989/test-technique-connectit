import { type Framework, type MetadataField, type PrimaryKey } from "@nx-nestjs-angular-starter/database";
import { IsString, IsInt, IsDateString } from "class-validator";

export class CreateFrameworkDTO implements Omit<Framework, PrimaryKey | MetadataField> {
	@IsString()
	name!: string;

	@IsString()
	img!: string;

	@IsInt()
	codingLanguageId!: number;

	@IsInt()
	frameworkTypeId!: number;

	@IsDateString()
	releasedAt!: Date;
}
