import type { Observable } from "rxjs";

export type Entity = {
	id: unknown;
};
export type CRUDConfig = {
	id: unknown;
	create: {
		input: unknown;
		output: unknown;
	};
	readOne: { output: unknown };
	readAll: { output: unknown };
	update: {
		input: unknown;
		output: unknown;
	};
	delete: { output: unknown };
};
export type CRUD<C extends CRUDConfig> = {
	/** CRUD - Create */
	create(data: C["create"]["input"]): C["create"]["output"];
	/** CRUD - Read one */
	readOne(id: C["id"]): C["readOne"]["output"];
	/** CRUD - Read all */
	readAll(): C["readAll"]["output"];
	/** CRUD - Update */
	update(id: C["id"], data: C["update"]["input"]): C["update"]["output"];
	/** CRUD - Delete */
	delete(id: C["id"]): C["delete"]["output"];
};
export type AbstractCRUD<
	E extends Entity,
	Create extends [createDTO: unknown, createResult: unknown],
	ReadOne extends [readOneResult: unknown],
	ReadAll extends [readAllResult: unknown],
	Update extends [updateDTO: unknown, updateResult: unknown],
	Delete extends [deleteResult: unknown],
> = {
	/** CRUD - Create */
	create(data: Create[0]): Create[1];

	/** CRUD - Read */
	readOne(id: E["id"]): ReadOne[0];

	/** CRUD - Read */
	readAll(): ReadAll[0];

	/** CRUD - Update */
	update(id: E["id"], data: Update[0]): Update[1];

	/** CRUD - Delete */
	delete(id: E["id"]): Delete[0];
};
export type AbstractSearchableCRUD<Search extends [searchDTO: unknown, searchResult: unknown]> = {
	search(query: Search[0]): Search[1];
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Promisified {
	export type CRUD<E extends Entity, CreateDTO, UpdateDO> = AbstractCRUD<
		E,
		[CreateDTO, Promise<E>],
		[Promise<E | null>],
		[Promise<E[]>],
		[UpdateDO, Promise<E | null>],
		[Promise<E | null>]
	>;

	export type SearchableCRUD<E extends Entity, SearchDTO> = AbstractSearchableCRUD<[SearchDTO, Promise<E[]>]>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Observableified {
	export type CRUD<E extends Entity, CreateDTO, UpdateDO> = AbstractCRUD<
		E,
		[CreateDTO, Promise<E>],
		[Observable<E | null>],
		[Observable<E[]>],
		[UpdateDO, Promise<E | null>],
		[Promise<E | null>]
	>;

	export type Searchable<E extends Entity, SearchDTO> = AbstractSearchableCRUD<[SearchDTO, Observable<E[]>]>;
}
