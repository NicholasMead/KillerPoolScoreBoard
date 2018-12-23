import { BaseEvent } from "./BaseEvent";

export class NewGameStarted extends BaseEvent {
    Name: string;
  
    public constructor(name: string) {
        super("NewGameStarted");
        this.Name = name;
    }
}
