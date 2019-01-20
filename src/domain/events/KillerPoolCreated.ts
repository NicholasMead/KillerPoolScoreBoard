import { KillerPoolEvent } from "./abstractions/KillerPoolEvent";
import { KillerPool } from "../aggregateRoots/killerPool/index";

export class KillerPoolCreated extends KillerPoolEvent {
    public constructor(killerPool: KillerPool) {
        super("KillerPoolCreated", killerPool);
    }
}