import { BaseEvent } from "./BaseEvent";

export class GameEnded extends BaseEvent {
    Name: string;

    public constructor(name: string) {
        super("GameEnded");
        this.Name = name;
    }
}

