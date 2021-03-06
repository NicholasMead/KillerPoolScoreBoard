import { Player } from "../aggregateRoots/killerPool/player";
import { KillerPoolEvent } from "./abstractions/KillerPoolEvent";
import { KillerPool } from "../aggregateRoots/killerPool/index";

export class PlayerEnteredKillerPool extends KillerPoolEvent {
    private player: Player;
    
    public constructor(kilerPool: KillerPool, player: Player) {
        super("PlayerEnteredKillerPool", kilerPool);
    
        this.player = player;
    }
    
    public get Player(): Player {
        return this.player;
    }
}