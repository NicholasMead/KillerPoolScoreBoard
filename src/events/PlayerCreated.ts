import { BaseEvent } from "./BaseEvent";
import { IPlayerEvent } from "./abstractions/IPlayerEvent";

export class PlayerCreated extends BaseEvent implements IPlayerEvent{
    private _name: string;
    public get Name(): string {
        return this._name;
    }

    constructor(name: string, startingLives?: number) {
        super(PlayerCreated.TypeName);
        this._name = name;
    }

    public static get TypeName() : string {
        return "PlayerCreated" 
    }
}