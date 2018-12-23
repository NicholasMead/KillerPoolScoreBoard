import { IEvent } from "../framework/IEvent";
export class BaseEvent implements IEvent {
    Type: string;
    Time: number;
    constructor(type: string) {
        this.Type = type;
        this.Time = Date.now();
    }
}