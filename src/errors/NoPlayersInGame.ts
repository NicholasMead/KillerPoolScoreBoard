export class NoPlayersInGame extends Error {
    constructor() {
        super(`Invalid opperation, cannot start the game with no players.`);
    }
}