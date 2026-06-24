import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, iif, type Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";

import { CachableService } from "./cachable.service";
import { type Observableified } from "./crud.service";

export interface FetchOptions {
	/**
	 * The source to use for the fetch.
	 *
	 * Defaults to `default`.
	 *
	 * - `server-only` makes a direct API call for the result
	 * - `cache-only` returns data from the local cache
	 * - `default` optimistic returns: returns the data from the local cache while awaiting the result from the API call
	 * - `server-then-cache` makes a direct API call for the result then returns data from the local cache
	 *
	 * @default "default"
	 */
	source?: "server-only" | "cache-only" | "default" | "server-then-cache";
	/**
	 * A callback to call when the server is hit.
	 */
	serverHitCallback?: () => void;
}

@Injectable({
	providedIn: "root",
})
export abstract class BaseService<E extends { id: number | string }, CreateDTO, UpdateDTO, SearchDTO>
	extends CachableService<E>
	implements Observableified.CRUD<E, CreateDTO, UpdateDTO>, Observableified.Searchable<E, SearchDTO>
{
	public constructor(
		protected readonly baseUrl: string,
		protected readonly httpClient: HttpClient
	) {
		super();
	}

	/**
	 * Handle a source hit.
	 *
	 * @param source The source to use
	 * @param local The local observable
	 * @param remote The remote observable
	 * @returns The observable to use
	 */
	private handleSourceHit<T>(options: FetchOptions, local: Observable<T>, remote: Observable<T>) {
		const patchedRemote = remote.pipe(tap(() => options.serverHitCallback?.()));

		switch (options.source ?? "default") {
			case "cache-only":
				return local;
			case "default":
				patchedRemote.subscribe();

				return local;
			case "server-then-cache":
				return patchedRemote.pipe(switchMap(() => local));
			case "server-only":
				return patchedRemote;
			default:
				throw new Error(`Unknown source: ${options.source}`);
		}
	}

	/**
	 * Search for entities in the local cache.
	 *
	 * @param search The search object
	 * @returns The filtered array
	 */
	private localSearch(search: SearchDTO) {
		return this.value$.pipe(map(entities => entities.filter(entity => this.localSearchConfig(entity, search))));
	}

	/**
	 * Call the API to search for entities.
	 *
	 * @param search The search object
	 * @returns The filtered array
	 */
	private remoteSearch(search: SearchDTO) {
		const url = new URL(`${this.baseUrl}/search`);

		this.remoteSearchConfig(url.searchParams, search);

		return this.httpClient.get<E[]>(url.toString()).pipe(tap(entities => this.saveToCache(...entities)));
	}

	/**
	 * Override this method to add a default localSort.
	 *
	 * @param array The array to sort
	 * @returns The sorted array
	 */
	protected defaultLocalSort(array: E[]) {
		return array.sort((a, b) =>
			typeof a.id === "number" ? a.id - (b.id as number) : a.id.localeCompare(b.id as string)
		);
	}

	/**
	 * Override this method to configure the local search logic.
	 *
	 * @param entity The entity to test against the search
	 * @param search The search object
	 * @returns Whether the entity matches the search
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected localSearchConfig(entity: E, search: SearchDTO) {
		return true;
	}

	/**
	 * Override this method to add search parameters to the URL.
	 *
	 * @param searchParams The URLSearchParams object to modify
	 * @param search The search object
	 * @returns The modified URLSearchParams object
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected remoteSearchConfig(searchParams: URLSearchParams, search: SearchDTO) {
		return;
	}

	/**
	 * Search for entities.
	 *
	 * @param search The search object
	 * @param options The fetch options
	 * @returns The observable to use
	 */
	public search(search: SearchDTO, options: FetchOptions = {}) {
		const local = this.localSearch(search);
		const remote = this.remoteSearch(search);

		return this.handleSourceHit(options, local, remote).pipe(map(entities => this.defaultLocalSort(entities)));
	}

	public create(data: CreateDTO) {
		return firstValueFrom(
			this.httpClient.post<E>(`${this.baseUrl}`, data).pipe(tap(entity => this.saveToCache(entity)))
		);
	}

	public readOne(entityId: E["id"], options: FetchOptions = {}) {
		const local = this.value$.pipe(map(cacheValues => cacheValues.find(({ id }) => id === entityId) ?? null));
		const remote = this.httpClient
			.get<E | null>(`${this.baseUrl}/${entityId}`)
			.pipe(tap(entity => entity && this.saveToCache(entity)));

		if (!options.source || options.source === "default") {
			// If the value exist in the cache, return it, otherwise, return the remote value then the cache value.
			return local.pipe(
				switchMap(value =>
					iif(
						() => value != null,
						local,
						this.handleSourceHit({ source: "server-then-cache" }, local, remote)
					)
				)
			);
		}

		return this.handleSourceHit(options, local, remote);
	}

	public readAll(options: FetchOptions = {}) {
		const local = this.value$;
		const remote = this.httpClient.get<E[]>(`${this.baseUrl}`).pipe(tap(entities => this.saveToCache(...entities)));

		return this.handleSourceHit(options, local, remote).pipe(map(entities => this.defaultLocalSort(entities)));
	}

	public update(entityId: E["id"], data: UpdateDTO) {
		return firstValueFrom(
			this.httpClient
				.patch<E | null>(`${this.baseUrl}/${entityId}`, data)
				.pipe(tap(entity => entity && this.saveToCache(entity)))
		);
	}

	public delete(entityId: E["id"]) {
		return firstValueFrom(
			this.httpClient.delete<E>(`${this.baseUrl}/${entityId}`).pipe(tap(() => this.removeFromCache(entityId)))
		);
	}
}
