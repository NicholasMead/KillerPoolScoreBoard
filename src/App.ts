import { IEvent } from "./framework/IEvent";
import { CommandDispatcher } from "./framework/CommandDispatcher";

export class KillerPoolScoreBoardApplication {
    private _eventLog: IEvent[];
    private _commandDispatcher: CommandDispatcher;

    public constructor() {
        this._eventLog = [];
        this._commandDispatcher = new CommandDispatcher();
    }


}