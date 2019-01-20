//peers
import { Player } from "./player";
import { Score } from "./score";
import { Shot } from "./shot";
//framework
import { Entity } from "../../framework/Entity";
import { IEvent } from "../../framework/IEvent";
import { Guid } from "../../services/guid";
//events
import { PlayerEnteredKillerPool } from "../../events/PlayerEnteredKillerPool";
import { KillerPoolStarted } from "../../events/KillerPoolStarted";
import { KillerPoolEvent } from "../../events/abstractions/KillerPoolEvent";
//errors
import { DuplicatePlayerError } from "../../errors/DuplicatePlayerError";
import { GameAlreadyStarted } from "../../errors/GameAlreadyStarted";
import { GameNotStarted } from "../../errors/GameNotStarted";
import { NoPlayersInGame } from "../../errors/NoPlayersInGame";
import { PlayerTookShot } from "../../events/PlayerTookShot";

export class KillerPool extends Entity<Guid> {
    private _score: Score[] = [];
    private _nextPlayerIndex: number = 0;
    private _gameStarted: boolean = false;

    public constructor(id: Guid) {
        super(id);
        this.Register("PlayerEnteredKillerPool", this.onPlayerEntered.bind(this));
        this.Register("KillerPoolStarted", this.onGameStarted.bind(this));
        this.Register("PlayerTookShot", this.onPlayerTookShot.bind(this));
    }

    public get NextPlayer(): Player {
        this.throwIfGameNotStarted();
        return this._score[this._nextPlayerIndex].Player;
    }

    public get Players(): Player[] {
        return this._score.map(s => s.Player);
    }

    public AddPlayer(player: Player){
        if(this._score.some(s => s.Player.equals(player)))
            throw new DuplicatePlayerError(player);

        this.throwIfGameStarted();
        this.Raise(new PlayerEnteredKillerPool(this, player));
    }

    public Lives(player: Player): number {
        const score = this._score.find(s => s.Player.equals(player));

        if(!score)
            throw new Error(`No score for player [${player.Name}]`);

        return score.Lives;
    }
    
    public TakeShot(shot: Shot) {
        this.throwIfGameNotStarted();
        this.Raise(new PlayerTookShot(this, this.NextPlayer, shot));
    }

    public StartGame() {
        this.throwIfNoPlayers();
        this.throwIfGameStarted();
        this.Raise(new KillerPoolStarted(this));
    }

    private onGameStarted(ev: IEvent)
    {
        this.acceptEvent<KillerPoolStarted>(ev);
        this._gameStarted = true;
    }
    private onPlayerEntered(ev: IEvent)
    {
        const event = this.acceptEvent<PlayerEnteredKillerPool>(ev);
        this._score.push(new Score(event.Player, 3));
    }

    private onPlayerTookShot(ev: IEvent) {
        const event = this.acceptEvent<PlayerTookShot>(ev);
        const score = this._score.find(s => s.Player.equals(event.Player));
        
        if(!score) return;
        score.Lives += event.Shot.Value;
        
        if(score.Player.equals(this.NextPlayer))
            this.passToNextPlayer();
    }

    private acceptEvent<TEvent extends KillerPoolEvent>(ev: IEvent): TEvent
    {
        const parsedEvent = ev as TEvent;
        
        if(!parsedEvent) throw Error(`Invalid Event Type: ${typeof ev}`);
        if(this.Id !== parsedEvent.KillerPoolId) Error(`Event for incorrect instance`);

        return parsedEvent;        
    }

    private passToNextPlayer()
    {
        this._nextPlayerIndex++;
        if(this._nextPlayerIndex >= this._score.length)        
            this._nextPlayerIndex = 0;
    }

    private throwIfGameStarted()
    {
        if(this._gameStarted)
            throw new GameAlreadyStarted();
    }

    private throwIfGameNotStarted()
    {
        if(!this._gameStarted)
            throw new GameNotStarted();
    }

    private throwIfNoPlayers()
    {
        if(this._score.length < 1)
            throw new NoPlayersInGame();
    }
}
