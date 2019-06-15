export class GameEnded extends Error {
    constructor() {
        super(`Invalid opperation, the game has ended.`);
    }
}