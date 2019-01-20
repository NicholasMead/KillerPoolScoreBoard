export class GameNotStarted extends Error {
    constructor() {
        super(`Invalid opperation, the game has not started.`);
    }
}

