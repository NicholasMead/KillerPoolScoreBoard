import { Player } from "./player";
import { ValueObject } from "../../framework/ValueObject";

export class Score extends ValueObject {
    private _player: Player;
    private _lives: number;

    constructor(player: Player, lives: number) {
        super();
        this._player = player;
        this._lives = lives;
    }

    public get Lives(): number {
        return this._lives;
    }

    public set Lives(lives: number) {
        this._lives = lives;
    }

    public get Player(): Player {
        return this._player;
    }
}