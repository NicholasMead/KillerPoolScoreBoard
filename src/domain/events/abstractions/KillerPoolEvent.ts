import { IEvent } from "../../framework/IEvent";
import { Guid } from "../../services/guid";
import { BaseEvent } from "./BaseEvent";
import { KillerPool } from "../../aggregateRoots/killerPool";

export abstract class KillerPoolEvent extends BaseEvent {
    private _killerPoolId: Guid;

    public constructor(type: string, killerPool: KillerPool) {
        super(type);
        this._killerPoolId = killerPool.Id;
    }

    public get KillerPoolId(): Guid {
        return this._killerPoolId;
    }
}