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

    public get Events(): IEvent[] {
        return this._eventStore;
    }

    public AddPlayer(name: string) {
        this._commandDispatcher.Dispatch(new AddPlayerCommand(name));
    }

    public GetPlayers(): Player[] {
        let playersDict = new PlayerRepository(this._eventStore)
            .GetAll();

        let players: Player[] = [];
        for (var player in playersDict) {
            players.push(playersDict[player]);
        }

        return players;
    }
}