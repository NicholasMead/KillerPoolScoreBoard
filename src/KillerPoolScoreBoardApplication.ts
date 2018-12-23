import { IEvent } from "./framework/IEvent";
import { CommandDispatcher } from "./framework/CommandDispatcher";
import { Player } from "./models/Player";
import { AddPlayerCommand, AddPlayerCommandHandler } from "./commands/addPlayer";
import { PlayerRepository } from "./repositories/PlayerRepository";

export class KillerPoolScoreBoardApplication {
    private _eventStore: IEvent[];
    private _commandDispatcher: CommandDispatcher;

    public constructor() {
        this._eventStore = [];
        this._commandDispatcher = new CommandDispatcher()
            .Register(new AddPlayerCommandHandler(new PlayerRepository(this._eventStore)));

    }

    public AddPlayer(name: string, startingLives: number = 3) {
        this._commandDispatcher.Dispatch(new AddPlayerCommand(name, startingLives));
    }

    public GetPlayers() : Player[] {
        //TODO: implement func 
        throw new Error("Not Implemented");
    }
}