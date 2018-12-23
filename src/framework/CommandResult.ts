export class CommandResult {
    Success: boolean;
    errorMessage: string | undefined;
    private constructor(success: boolean, errorMessage?: string) {
        if (success && errorMessage)
            throw new Error("Cannot assign error message to successful command result.");
        this.Success = success;
        this.errorMessage = errorMessage;
    }
    static Success(): CommandResult {
        return new CommandResult(true);
    }
    static Fail(errorMessage: string): CommandResult {
        return new CommandResult(false, errorMessage);
    }
}