import { IEvent } from "../domain/framework/IEvent";
import { Player } from "../domain/aggregateRoots/killerPool/player";
import { ScoreBoard } from "./viewModels/scoreBoard";
import { Guid } from "../domain/services/guid";
import { KillerPool } from "../domain/aggregateRoots/killerPool";
import { KillerPoolRepository } from "./repositories/KillerPoolRepository";
import { Shot } from "../domain/aggregateRoots/killerPool/shot";

export class KillerPoolApplication {
    private _gameId: Guid;
    private _eventStore: IEvent[];
    private _poolRepository: KillerPoolRepository;

    public constructor() {
        this._eventStore = [];
        this._gameId = new KillerPool().Id;
        this._poolRepository = new KillerPoolRepository(this._eventStore);
    }

    public get Events(): IEvent[] {
        return this._eventStore;
    }

    public AddPlayer(name: string) {
        this.ForCurrentGame(game => game.AddPlayer(new Player(name)));
    }

    public StartGame() {
        this.ForCurrentGame(game => game.StartGame());
    }

    public PotBalls(count: number) {
        this.ForCurrentGame(game => game.TakeShot(Shot.Pot(count)));
    }

    public PlayFoul(severity: number) {
        this.ForCurrentGame(game => game.TakeShot(Shot.Foul(severity)));
    }
    
    public NewGame() {
        var newGame = new KillerPool();
        this._poolRepository.Save(newGame);
        this._gameId = newGame.Id;
    }

    public get GameStarted(): boolean {
        return this.currentGame().GameStarted;
    }

    public get GameEnded(): boolean {
        return this.currentGame().GameEnded;
    }

    public GetScoreBoard(): ScoreBoard {
        const scoreBoard: ScoreBoard = [];
        const currentGame = this.currentGame();
        for(let player of currentGame.Players)
            scoreBoard.push({
                player: player.Name,
                lives: currentGame.Lives(player),
                nextToPlay: currentGame.NextPlayer.equals(player),
            });
        return scoreBoard;
    }

    public GetWinner(): Player {
        const winner = this.currentGame().Winner;
        if(!winner)
            throw Error("No winned has been decided yet!");
        return winner;
    }

    private ForCurrentGame(callback: (currentGame: KillerPool) => void) {
        var currentGame = this._poolRepository.GetById(this._gameId);
        callback(currentGame);
        this._poolRepository.Save(currentGame);
    }

    private currentGame(): KillerPool {
        return this._poolRepository.GetById(this._gameId);
    }
}