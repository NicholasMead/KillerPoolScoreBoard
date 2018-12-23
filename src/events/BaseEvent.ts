import { IEvent } from "../framework/IEvent";
export class BaseEvent implements IEvent {
    
    private _type: string;
    public get Type() : string{
        return this._type;
    }

    private _time: number;
    public get Time() : number{
        return this._time;
    }
    
    constructor(type: string) {
        this._type = type;
        this._time = Date.now();
    }
}