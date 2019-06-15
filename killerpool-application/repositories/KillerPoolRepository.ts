//Domain
import { Guid, KillerPool, KillerPoolEvent } from "@killerpool/domain";

//Framework
import { EventStore } from "../framework/eventStore";

export class KillerPoolRepository {
    private _eventStore: EventStore;

    public constructor(eventStore: EventStore)
    {
        this._eventStore = eventStore;
    }

    public GetById(id: Guid): KillerPool {
        const killerPool = new KillerPool(id);
        killerPool.ClearEvents();

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
