import { ICommand } from "../framework/ICommand";
import { ICommandHandler } from "../framework/ICommandHandler";
import { CommandResult } from "../framework/CommandResult";
import { Player } from "../models/Player";

export class AddPlayerCommand implements ICommand{
    Type: string;
    Name: string;
    StartingLives: number;
    
    static GetType(): string {
        return "AddPlayerCommand";}

    constructor(name: string, startingLives: number)
    {
        this.Type = AddPlayerCommand.GetType();
        this.Name = name;
        this.StartingLives = startingLives;
    }
}

export class AddPlayerCommandHandler implements ICommandHandler{
    Type: string;    
    
    Handle(command: ICommand) : CommandResult {
        return CommandResult.Success();
    };

    constructor(){
        this.Type = AddPlayerCommand.GetType();
    }
} 