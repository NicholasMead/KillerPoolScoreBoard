import { IEvent } from "./framework/IEvent";
import { CommandDispatcher } from "./framework/CommandDispatcher";
import { Player } from "./aggregateRoots/killerPool/player";

export class KillerPoolScoreBoardApplication {
    private _eventStore: IEvent[];
    private _commandDispatcher: CommandDispatcher;

    public constructor() {
        this._eventStore = [];
        this._commandDispatcher = new CommandDispatcher();
    }

    public get Events(): IEvent[] {
        return this._eventStore;
    }

    public AddPlayer(name: string) {
        throw new Error("Not implemented");
    }

    public GetPlayers(): Player[] {
        throw new Error("Not implemented");
    }
}