import { Player } from "./player";
import { Entity } from "../../framework/Entity";
import { IEvent } from "../../framework/IEvent";
import { Guid } from "../../services/guid";
import { DuplicatePlayerError } from "../../errors/DuplicatePlayerError";
import { PlayerEnteredKillerPool } from "../../events/PlayerEnteredKillerPool";
import { KillerPoolStarted } from "../../events/KillerPoolStarted";
import { KillerPoolEvent } from "../../events/abstractions/KillerPoolEvent";
import { GameAlreadyStarted } from "../../errors/GameAlreadyStarted";

export class KillerPool extends Entity<Guid> {

    private _players: Player[] = [];
    private _gameStarted: boolean = false;

    public constructor(id: Guid) {
        super(id);
        this.Register("PlayerEnteredKillerPool", this.onPlayerEntered.bind(this));
        this.Register("KillerPoolStarted", this.onGameStarted.bind(this));
    }

    public get Players(): Player[] {
        let players : Player[] = []
        
        for(let player of this._players)
            players.push(player);
        
        return players;
    }

    public AddPlayer(player: Player){
        for(let existingPlayer of this._players)
            if(existingPlayer.Name === player.Name)
                throw new DuplicatePlayerError(player);

        this.throwIfGameStarted();
        this.Raise(new PlayerEnteredKillerPool(this, player));
    }

    public StartGame(){
        this.throwIfGameStarted();
        this.Raise(new KillerPoolStarted(this));
    }

    private onPlayerEntered(ev: IEvent)
    {
        const event = this.acceptEvent<PlayerEnteredKillerPool>(ev);
        
        this._players.push(event.Player);
    }

    private onGameStarted(ev: IEvent)
    {
        this.acceptEvent<KillerPoolStarted>(ev);

        this._gameStarted = true;
    }

    private acceptEvent<TEvent extends KillerPoolEvent>(ev: IEvent): TEvent
    {
        const parsedEvent = ev as TEvent;
        
        if(!parsedEvent) throw Error(`Invalid Event Type: ${typeof ev}`);
        if(this.Id !== parsedEvent.KillerPoolId) Error(`Event for incorrect instance`);

        return parsedEvent;        
    }

    private throwIfGameStarted()
    {
        if(this._gameStarted)
            throw new GameAlreadyStarted();
    }
}

