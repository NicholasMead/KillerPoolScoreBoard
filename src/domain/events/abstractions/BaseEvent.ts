import { IEvent } from "../../framework/IEvent";
export abstract class Event implements IEvent {
    
    private type: string;
    public get Type() : string{
        return this.type;
    }

    private time: number;
    public get Time() : number{
        return this.time;
    }
    
    constructor(type: string) {
        this.type = type;
        this.time = Date.now();
    }
}