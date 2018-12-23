import { ICommand } from "./ICommand";
import { CommandResult } from "./CommandResult";
import { ICommandHandler } from "./ICommandHandler";

export class CommandDispatcher {
    private _handlers: { [id: string]: ICommandHandler }

    public constructor() {
        this._handlers = {};
    }

    public Dispatch(command: ICommand): CommandResult {
        var handler = this._handlers[command.Type];

        if (!handler)
            throw new Error("No handler found for command ${command.Type}.");

        return handler.Handle(command);
    }

    public Register(handler : ICommandHandler)
    {
        this._handlers[handler.Type] = handler;
    }
}

