import { Player } from "./player";
import { ValueObject } from "../../framework/ValueObject";
import { Shot } from "./shot";

export class Score extends ValueObject {
    private _player: Player;
    private _lives: number;
    private _inPlay: boolean = true;

    constructor(player: Player, lives: number, inplay?: boolean) {
        super();
        this._player = player;
        this._lives = lives;
        inplay ? this._inPlay = inplay : {};
    }

    public get InPlay(): boolean {
        return this._inPlay;
    }

    public get Lives(): number {
        return this._lives;
    }

    public get Player(): Player {
        return this._player;
    }

    public ApplyShot(shot: Shot) {
        this._lives += shot.Value;
        
        if(this._lives <= 0)
        {
            this._lives = 0;
            this._inPlay = false;
        }
    }
}