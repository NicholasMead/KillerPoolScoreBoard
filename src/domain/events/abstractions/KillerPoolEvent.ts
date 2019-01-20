import { Guid } from "../../services/guid";
import { Event } from "./BaseEvent";
import { KillerPool } from "../../aggregateRoots/killerPool";

export abstract class KillerPoolEvent extends Event {
    private killerPoolId: Guid;

    public constructor(type: string, killerPool: KillerPool) {
        super(type);
        this.killerPoolId = killerPool.Id;
    }

    public get KillerPoolId(): Guid {
        return this.killerPoolId;
    }
}