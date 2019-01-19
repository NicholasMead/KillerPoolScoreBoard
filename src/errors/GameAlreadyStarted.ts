export class GameAlreadyStarted extends Error {
    constructor() {
        super(`Invalid opperation, the game has already started.`);
    }
}