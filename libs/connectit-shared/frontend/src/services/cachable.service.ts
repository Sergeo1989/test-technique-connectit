import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { type Entity } from "./crud.service";

@Injectable({
	providedIn: "root",
})
export abstract class CachableService<E extends Entity> {
	private readonly _cache = new BehaviorSubject<Map<E["id"], E>>(new Map());

	protected readonly value$ = this._cache.pipe(map(cacheMap => (cacheMap ? [...cacheMap.values()] : [])));

	protected saveToCache(...entities: E[]) {
		const validEntities = entities.filter(entity => typeof entity === "object" && !!entity.id);

		if (validEntities.length === 0) return;

		const local = this._cache.getValue() ?? new Map<E["id"], E>();

		for (const entity of validEntities) {
			local.set(entity.id, entity);
		}

		this._cache.next(local);
	}

	protected removeFromCache(...entityIds: E["id"][]) {
		const local = this._cache.getValue();

		if (!local) {
			return;
		}

		let updatedCount = 0;

		for (const entityId of entityIds) {
			if (local.delete(entityId)) {
				updatedCount++;
			}
		}

		if (updatedCount > 0) {
			this._cache.next(local);
		}
	}
}
