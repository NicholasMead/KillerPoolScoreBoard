import { ICommand } from "../framework/ICommand";
import { ICommandHandler } from "../framework/ICommandHandler";
import { CommandResult } from "../framework/CommandResult";
import { Player } from "../models/Player";
import { PlayerRepository } from "../repositories/PlayerRepository";

export class AddPlayerCommand implements ICommand {
    Type: string;
    Name: string;
    StartingLives: number;

    static GetType(): string {
        return "AddPlayerCommand";
    }

    constructor(name: string, startingLives: number) {
        this.Type = AddPlayerCommand.GetType();
        this.Name = name;
        this.StartingLives = startingLives;
    }
}

export class AddPlayerCommandHandler implements ICommandHandler {
    Type: string;
    private _playerRepository: PlayerRepository;

    Handle(command: ICommand): CommandResult {
        if (command.Type !== this.Type)
            throw new Error("Cannot handle command ${command.Type}");

        var addPlayerCommand = command as AddPlayerCommand;

        // if(this._playerRepository.ContainsPlayerWithName(addPlayerCommand.Name))
        //     return CommandResult.Fail("Player Already Exists");

        var newPlayer = new Player(addPlayerCommand.Name);

        this._playerRepository.AddPlayer(newPlayer);

        return CommandResult.Success();
    };

    constructor(playerRepository : PlayerRepository) {
        this.Type = AddPlayerCommand.GetType();
        this._playerRepository = playerRepository;
    }
} 