import { BaseEvent } from "./BaseEvent";

export class PlayerCreated extends BaseEvent {
    constructor(name: string, startingLives: number) {
        super("Player Created");
        this.Name = name;
    }
    Name: string;
}