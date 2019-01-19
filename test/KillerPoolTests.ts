import { expect, assert } from 'chai';
import { KillerPool } from '../src/aggregateRoots/killerPool';
import { Guid } from '../src/services/guid';
import { Player } from '../src/aggregateRoots/killerPool/player';
import { GameAlreadyStarted } from '../src/errors/GameAlreadyStarted';
import { GameNotStarted } from '../src/errors/GameNotStarted';
import { NoPlayersInGame } from '../src/errors/NoPlayersInGame';
import { Shot } from '../src/aggregateRoots/killerPool/shot';

describe("KillerPool", () => {     

    it("Can add players", () => {
        const killer = new KillerPool(Guid.newGuid());
        const player1 = new Player("Nick");
        const player2 = new Player("Rupe");
        
        killer.AddPlayer(player1);
        killer.AddPlayer(player2);
        
        expect(killer.Players.length).to.eq(2);
        expect(killer.Players[0].Name).to.eq(player1.Name);
        expect(killer.Players[1].Name).to.eq(player2.Name);
    });

    it("Cannot add players after game started", () => {
        const killer = new KillerPool(Guid.newGuid());
        const player1 = new Player("Nick");
        const player2 = new Player("Rupe");
        killer.AddPlayer(player1);
        killer.StartGame();

        assert.throws(() => killer.AddPlayer(player2), GameAlreadyStarted);
    });

    it("Cannot start game twice", () => {
        const killer = new KillerPool(Guid.newGuid());
        const player1 = new Player("Nick");
        killer.AddPlayer(player1);
        killer.StartGame();

        assert.throws(() => killer.StartGame(), GameAlreadyStarted);
    });

    it("Cannot start game without players", () => {
        const killer = new KillerPool(Guid.newGuid());

        assert.throws(() => killer.StartGame(), NoPlayersInGame);
    });

    it("All players start with 3 lives", () => {
        const killer = new KillerPool(Guid.newGuid());
        const player1 = new Player("Nick");
        const player2 = new Player("Rupe");
        
        killer.AddPlayer(player1);
        killer.AddPlayer(player2);
        killer.StartGame();

        for(let player of killer.Players)
            expect(killer.Lives(player)).is.eq(3);
    });

    it("First player added shoots first", () => {
        const killer = new KillerPool(Guid.newGuid());
        const player1 = new Player("Nick");
        const player2 = new Player("Rupe");
        
        killer.AddPlayer(player1);
        killer.AddPlayer(player2);
        killer.StartGame();

        expect(killer.NextPlayer.Name).is.eq(player1.Name);
    });

    it("Cannot get next player before the game starts", () => {
        const killer = new KillerPool(Guid.newGuid());
        const player1 = new Player("Nick");
        
        killer.AddPlayer(player1);

        assert.throws(() => killer.NextPlayer, GameNotStarted);
    });

    it("Cannot shoot before the game starts", () => {
        const killer = new KillerPool(Guid.newGuid());

        assert.throws(() => killer.TakeShot(Shot.Pass()), GameNotStarted);
    });

    it("Shooting a foul loses 1 life", () => {
        const killer = new KillerPool(Guid.newGuid());
        const player1 = new Player("Nick");
        killer.AddPlayer(player1);
        killer.StartGame();

        killer.TakeShot(Shot.Foul());

        expect(killer.Lives(player1)).is.eq(2);
    });

    it("Shooting a multi foul loses many lifes", () => {
        const killer = new KillerPool(Guid.newGuid());
        const player1 = new Player("Nick");
        killer.AddPlayer(player1);
        killer.StartGame();

        killer.TakeShot(Shot.Foul(2));

        expect(killer.Lives(player1)).is.eq(1);
    });

    it("Shooting a pass loses maintains lifes", () => {
        const killer = new KillerPool(Guid.newGuid());
        const player1 = new Player("Nick");
        killer.AddPlayer(player1);
        killer.StartGame();

        killer.TakeShot(Shot.Pass());

        expect(killer.Lives(player1)).is.eq(3);
    });

    it("Shooting a gain loses adds lifes", () => {
        const killer = new KillerPool(Guid.newGuid());
        const player1 = new Player("Nick");
        killer.AddPlayer(player1);
        killer.StartGame();

        killer.TakeShot(Shot.Gain(2));

        expect(killer.Lives(player1)).is.eq(5);
    });

    it("After takeing a shot, its the next players turn", () => {
        const killer = new KillerPool(Guid.newGuid());
        const player1 = new Player("Nick");
        const player2 = new Player("Rupe");
        killer.AddPlayer(player1);
        killer.AddPlayer(player2);
        killer.StartGame();

        killer.TakeShot(Shot.Pass());

        expect(killer.NextPlayer.Name).is.eq(player2.Name);
    });

    it("First player shoots after last player", () => {
        const killer = new KillerPool(Guid.newGuid());
        const player1 = new Player("Nick");
        const player2 = new Player("Rupe");
        const player3 = new Player("David");
        killer.AddPlayer(player1);
        killer.AddPlayer(player2);
        killer.AddPlayer(player3);
        killer.StartGame();

        killer.TakeShot(Shot.Pass());
        killer.TakeShot(Shot.Pass());
        killer.TakeShot(Shot.Pass());

        expect(killer.NextPlayer.Name).is.eq(player1.Name);
    });
});