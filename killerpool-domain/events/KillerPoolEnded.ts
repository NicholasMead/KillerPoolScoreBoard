import { KillerPoolEvent } from "./abstractions/KillerPoolEvent";
import { KillerPool } from "../aggregateRoots/killerPool/index";

export class KillerPoolEnded extends KillerPoolEvent {
    public constructor(killerPool: KillerPool) {
      super("KillerPoolEnded", killerPool);
    }
}
