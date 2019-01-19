import { Player } from "../aggregateRoots/killerPool/player";
export class DuplicatePlayerError extends Error {
    constructor(player: Player) {
        super(`Player of name [${player.Name}] is already playing the game`);
    }
}