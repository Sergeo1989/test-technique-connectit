import { type FrameworkType, type PrimaryKey } from "@nx-nestjs-angular-starter/database";
import { IsString } from "class-validator";

export class CreateFrameworkTypeDTO implements Omit<FrameworkType, PrimaryKey> {
	@IsString()
	name!: string;
}
