import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export enum FrameworkSortBy {
	Id = "id",
	Name = "name",
	ReleasedAt = "releasedAt",
}

export enum SortOrder {
	Asc = "asc",
	Desc = "desc",
}

export class FrameworkQueryDTO {
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(100)
	pageSize?: number;

	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	codingLanguageId?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	frameworkTypeId?: number;

	@IsOptional()
	@IsEnum(FrameworkSortBy)
	sortBy?: FrameworkSortBy;

	@IsOptional()
	@IsEnum(SortOrder)
	sortOrder?: SortOrder;
}
