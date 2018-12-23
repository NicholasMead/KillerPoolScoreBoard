import { BaseEvent } from "./BaseEvent";

export class PlayerTookShot extends BaseEvent {
    Score: number;

    public constructor(score: number) {
        super("PlayerTookShot");
        this.Score = score;
    }
}