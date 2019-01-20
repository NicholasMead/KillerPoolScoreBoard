import { Player } from "../aggregateRoots/killerPool/player";
import { Shot } from "../aggregateRoots/killerPool/shot";
import { KillerPoolEvent } from "./abstractions/KillerPoolEvent";
import { KillerPool } from "../aggregateRoots/killerPool/index";

export class PlayerTookShot extends KillerPoolEvent {
    private player: Player;
    private shot: Shot;

    constructor(killerPool: KillerPool, player: Player, shot: Shot) {
        super("PlayerTookShot", killerPool);
        this.player = player;
        this.shot = shot;
    }

    public get Player(): Player {
        return this.player;
    }

    public get Shot(): Shot {
        return this.shot;
    }
}