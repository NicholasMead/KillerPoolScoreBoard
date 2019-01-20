export class InsufficientPlayersInGame extends Error {
    constructor() {
        super(`Invalid opperation, game requires 2 players to start.`);
    }
}