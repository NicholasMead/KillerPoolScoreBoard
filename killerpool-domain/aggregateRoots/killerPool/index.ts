//peers
import { Player } from "./player";
import { Score } from "./score";
import { Shot } from "./shot";
//framework & extenal
import { Guid } from "../../services/guid";
import { Entity } from "../../framework/Entity";
import { IEvent } from "../../framework/IEvent";
import { mapReduce } from "../../services/mapReduce";
//events
import { PlayerEnteredKillerPool } from "../../events/PlayerEnteredKillerPool";
import { KillerPoolCreated } from "../../events/KillerPoolCreated";
import { KillerPoolStarted } from "../../events/KillerPoolStarted";
import { KillerPoolEvent } from "../../events/abstractions/KillerPoolEvent";
import { PlayerTookShot } from "../../events/PlayerTookShot";
//errors
import { DuplicatePlayerError } from "../../errors/DuplicatePlayerError";
import { GameAlreadyStarted } from "../../errors/GameAlreadyStarted";
import { GameNotStarted } from "../../errors/GameNotStarted";
import { InsufficientPlayersInGame } from "../../errors/InsufficientPlayersInGame";
import { GameEnded } from "../../errors/GameEnded";
import { KillerPoolEnded } from "../../events/KillerPoolEnded";

export class KillerPool extends Entity<Guid> {
    private _score: Score[] = [];
    private _nextPlayerIndex: number = 0;
    private _gameStarted: boolean = false;
    private _gameEnded: boolean = false;

    private initialise() {
        this.Register("PlayerEnteredKillerPool", this.onPlayerEntered.bind(this));
        this.Register("KillerPoolCreated", this.onCreated.bind(this));
        this.Register("KillerPoolStarted", this.onGameStarted.bind(this));
        this.Register("KillerPoolEnded", this.onGameEnded.bind(this));
        this.Register("PlayerTookShot", this.onPlayerTookShot.bind(this));
    }

    public constructor(id?: Guid) {
        super(id ? id : Guid.newGuid());
        this.initialise();
        this.Raise(new KillerPoolCreated(this));
    }

    public get GameStarted(): boolean {
        return this._gameStarted;
    }

    public get GameEnded(): boolean {
        return this._gameEnded;
    }

    public get NextPlayer(): Player {
        this.throwIfGameNotStarted();
        return this._score[this._nextPlayerIndex].Player;
    }

    public get Players(): Player[] {
        return this._score.map(s => s.Player);
    }

    public get Winner(): Player | undefined {
        if (this.GameEnded) {
            return mapReduce(this._score, new Player(""), (winner, score) => {
                if (score.InPlay)
                    return score.Player;
                return winner;
            })
        }
    }

    public AddPlayer(player: Player) {
        if (this._score.some(s => s.Player.equals(player)))
            throw new DuplicatePlayerError(player);

        this.throwIfGameStarted();
        this.Raise(new PlayerEnteredKillerPool(this, player));
    }

    public InPlay(player: Player): boolean {
        const score = this._score.find(s => s.Player.equals(player));

        if (!score) return false;

        return score.InPlay;
    }

    public Lives(player: Player): number {
        const score = this._score.find(s => s.Player.equals(player));

        if (!score)
            throw new Error(`No score for player [${player.Name}]`);

        return score.Lives;
    }

    public TakeShot(shot: Shot) {
        this.throwIfGameNotStarted();
        this.throwIfGameEnded();

        this.Raise(new PlayerTookShot(this, this.NextPlayer, shot));

        if(this.gameHasEnded())
            this.Raise(new KillerPoolEnded(this));
    }

    public StartGame() {
        this.throwIfInsufficientPlayers();
        this.throwIfGameStarted();
        this.Raise(new KillerPoolStarted(this));
    }

    private onGameStarted(ev: IEvent) {
        this.acceptEvent<KillerPoolStarted>(ev);
        this._gameStarted = true;
    }

    private onGameEnded(ev: IEvent) {
        this.acceptEvent<KillerPoolEnded>(ev);
        this._gameEnded = true;
    }

    private onCreated(ev: IEvent) {
        this.acceptEvent<KillerPoolCreated>(ev);
    }

    private onPlayerEntered(ev: IEvent) {
        const event = this.acceptEvent<PlayerEnteredKillerPool>(ev);
        this._score.push(new Score(event.Player, 3));
    }

    private onPlayerTookShot(ev: IEvent) {
        const event = this.acceptEvent<PlayerTookShot>(ev);
        const score = this._score.find(s => s.Player.equals(event.Player));

        if (!score) return;
        score.ApplyShot(event.Shot);

        if (score.Player.equals(this.NextPlayer))
            this.passToNextPlayer();
    }

    private acceptEvent<TEvent extends KillerPoolEvent>(ev: IEvent): TEvent {
        const parsedEvent = ev as TEvent;

        if (!parsedEvent) throw Error(`Invalid Event Type: ${typeof ev}`);
        if (this.Id !== parsedEvent.KillerPoolId) Error(`Event for incorrect instance`);

        return parsedEvent;
    }

    private getActivePlayers(): Player[] {
        return this._score
            .filter(s => s.InPlay)
            .map(s => s.Player);
    }

    private gameHasEnded(): boolean {
        if (!this._gameStarted)
            return false;
        return this.getActivePlayers().length <= 1
    }
    
    private passToNextPlayer() {
        this._nextPlayerIndex++;
        if (this._nextPlayerIndex >= this._score.length)
            this._nextPlayerIndex = 0;

        if (!this.InPlay(this.NextPlayer))
            this.passToNextPlayer();
    }

    private throwIfGameStarted() {
        if (this._gameStarted)
            throw new GameAlreadyStarted();
    }

    private throwIfGameNotStarted() {
        if (!this._gameStarted)
            throw new GameNotStarted();
    }

    private throwIfInsufficientPlayers() {
        if (this._score.length < 2)
            throw new InsufficientPlayersInGame();
    }

    private throwIfGameEnded() {
        if (this.GameEnded)
            throw new GameEnded();
    }
}
