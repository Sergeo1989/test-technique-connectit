export * from "@prisma/client";

export type MetadataField = "createdAt" | "updatedAt" | "deletedAt";
export type PrimaryKey = "id";

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
}
