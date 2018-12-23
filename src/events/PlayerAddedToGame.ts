import { BaseEvent } from "./BaseEvent";

export class PlayerAddedToGame extends BaseEvent {
    StartingLives: number;
    GameId: string;
    PlayerId: string;

    constructor(playerId: string, gameId: string, startingLives: number) {
        super("PLayerAddedToGame");
        this.PlayerId = playerId;
        this.GameId = gameId;
        this.StartingLives = startingLives;
    }
}
