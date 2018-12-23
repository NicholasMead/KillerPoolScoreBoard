import { Player } from "./Player";

export class Game {

    Players: Player[];

    constructor(players: Player[]) {
        this.Players = players;
    }
}