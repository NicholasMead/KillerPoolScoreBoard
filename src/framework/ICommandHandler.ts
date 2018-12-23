import { ICommand } from "./ICommand";
import { CommandResult } from "./CommandResult";
export interface ICommandHandler {
    Type: string;
    Handle: (command: ICommand) => CommandResult;
}