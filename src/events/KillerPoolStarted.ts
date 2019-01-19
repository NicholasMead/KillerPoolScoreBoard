import { KillerPoolEvent } from "./abstractions/KillerPoolEvent";
import { KillerPool } from "../aggregateRoots/killerPool/index";

export class KillerPoolStarted extends KillerPoolEvent {
    public constructor(killerPool: KillerPool) {
        super("KillerPoolStarted", killerPool);
    }
}
