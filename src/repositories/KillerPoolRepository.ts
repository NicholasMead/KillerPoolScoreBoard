import { IEvent } from "../domain/framework/IEvent";
import { Guid } from "../domain/services/guid";
import { KillerPool } from "../domain/aggregateRoots/killerPool";
import { KillerPoolEvent } from "../domain/events/abstractions/KillerPoolEvent";

export class KillerPoolRepository {
    private _eventStore: IEvent[];

    public constructor(eventStore: IEvent[])
    {
        this._eventStore = eventStore;
    }

    public GetById(id: Guid): KillerPool {
        const killerPool = new KillerPool(id);

        this._eventStore
            .filter(ev => ev instanceof KillerPoolEvent)
            .map(ev => ev as KillerPoolEvent)
            .filter(ev => ev.KillerPoolId === id)
            .forEach(ev => killerPool.ApplyEvent(ev));

        return killerPool;
    }

    public Save(killerPool: KillerPool) {
        killerPool
            .PopEvents()
            .reverse()
            .forEach(ev =>this._eventStore.push(ev));
    }
}