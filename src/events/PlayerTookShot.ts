import { Player } from "../aggregateRoots/killerPool/player";
import { Shot } from "../aggregateRoots/killerPool/shot";
import { KillerPoolEvent } from "./abstractions/KillerPoolEvent";
import { KillerPool } from "../aggregateRoots/killerPool/index";

export class PlayerTookShot extends KillerPoolEvent {
    private _player: Player;
    private _shot: Shot;

    constructor(killerPool: KillerPool, player: Player, shot: Shot) {
        super("PlayerTookShot", killerPool);
        this._player = player;
        this._shot = shot;
    }

    public get Player(): Player {
        return this._player;
    }

    public get Shot(): Shot {
        return this._shot;
    }
}