//framework
import { expect, assert } from 'chai';
//model
import { KillerPool } from '../src/domain/aggregateRoots/killerPool';
import { Player } from '../src/domain/aggregateRoots/killerPool/player';
import { Shot } from '../src/domain/aggregateRoots/killerPool/shot';
//errors
import { InsufficientPlayersInGame } from '../src/domain/errors/InsufficientPlayersInGame';
import { GameAlreadyStarted } from '../src/domain/errors/GameAlreadyStarted';
import { GameNotStarted } from '../src/domain/errors/GameNotStarted';
import { GameEnded } from '../src/domain/errors/GameEnded';

const addPlayer = (killerPool: KillerPool) : Player => {
    const playerCount = killerPool.Players.length;
    const player = new Player(`Player${playerCount + 1}`);
    killerPool.AddPlayer(player);
    return player;
}

const addPlayers = (killerPool: KillerPool, playerCount: number) : Player[] => {
    for(let i = 0; i < playerCount; i++)
        addPlayer(killerPool);
    return killerPool.Players;
}

describe("KillerPool", () => {     

    it("Can add players", () => {
        const killer = new KillerPool();
        const players = addPlayers(killer, 2);
        
        expect(killer.Players.length).to.eq(2);
        expect(killer.Players[0].Name).to.eq(players[0].Name);
        expect(killer.Players[1].Name).to.eq(players[1].Name);
    });

    it("Cannot add players after game started", () => {
        const killer = new KillerPool();
        addPlayers(killer, 2);

        killer.StartGame();

        assert.throws(() => addPlayer(killer), GameAlreadyStarted);
    });

    it("Cannot start game twice", () => {
        const killer = new KillerPool();
        addPlayers(killer, 2);
        killer.StartGame();

        assert.throws(() => killer.StartGame(), GameAlreadyStarted);
    });

    it("Cannot start game without 0 players", () => {
        const killer = new KillerPool();

        assert.throws(() => killer.StartGame(), InsufficientPlayersInGame);
    });

    it("Cannot start game without 1 player", () => {
        const killer = new KillerPool();
        addPlayer(killer);

        assert.throws(() => killer.StartGame(), InsufficientPlayersInGame);
    });

    it("All players start with 3 lives", () => {
        const killer = new KillerPool();
        addPlayers(killer, 2);
        
        killer.StartGame();

        for(let player of killer.Players)
            expect(killer.Lives(player)).is.eq(3);
    });

    it("First player added shoots first", () => {
        const killer = new KillerPool();
        const players = addPlayers(killer, 2);
        
        killer.StartGame();

        expect(killer.NextPlayer.Name).is.eq(players[0].Name);
    });

    it("Cannot get next player before the game starts", () => {
        const killer = new KillerPool();
        addPlayers(killer, 2);

        assert.throws(() => killer.NextPlayer, GameNotStarted);
    });

    it("Cannot shoot before the game starts", () => {
        const killer = new KillerPool();

        assert.throws(() => killer.TakeShot(Shot.Pot(1)), GameNotStarted);
    });

    it("Shooting a foul loses 1 life", () => {
        const killer = new KillerPool();
        const players = addPlayers(killer, 2);
        killer.StartGame();

        killer.TakeShot(Shot.Foul());

        expect(killer.Lives(players[0])).is.eq(2);
        expect(killer.Lives(players[1])).is.eq(3);
    });

    it("Shooting a multi foul loses many lifes", () => {
        const killer = new KillerPool();
        const players = addPlayers(killer, 2);
        killer.StartGame();

        killer.TakeShot(Shot.Foul(2));

        expect(killer.Lives(players[0])).is.eq(1);
        expect(killer.Lives(players[1])).is.eq(3);
    });

    it("Potting single ball maintains lifes", () => {
        const killer = new KillerPool();
        const players = addPlayers(killer, 2);
        killer.StartGame();

        killer.TakeShot(Shot.Pot(1));

        expect(killer.Lives(players[0])).is.eq(3);
        expect(killer.Lives(players[1])).is.eq(3);
    });

    it("Potting multiple balls adds lifes", () => {
        const killer = new KillerPool();
        const players = addPlayers(killer, 2);
        killer.StartGame();

        killer.TakeShot(Shot.Pot(3));

        expect(killer.Lives(players[0])).is.eq(5);
        expect(killer.Lives(players[1])).is.eq(3);
    });

    it("After takeing a shot, its the next players turn", () => {
        const killer = new KillerPool();
        const players = addPlayers(killer, 2);
        killer.StartGame();

        killer.TakeShot(Shot.Pot(1));

        expect(killer.NextPlayer.Name).is.eq(players[1].Name);
    });

    it("First player shoots after last player", () => {
        const killer = new KillerPool();
        const players = addPlayers(killer, 3);
        killer.StartGame();

        killer.TakeShot(Shot.Pot(1));
        expect(killer.NextPlayer.Name).is.eq(players[1].Name);

        killer.TakeShot(Shot.Pot(1));
        expect(killer.NextPlayer.Name).is.eq(players[2].Name);

        killer.TakeShot(Shot.Pot(1));
        expect(killer.NextPlayer.Name).is.eq(players[0].Name);
    });

    it("Players start in the game", () => {
        const killer = new KillerPool();
        const players = addPlayers(killer, 3);
        
        killer.StartGame();

        for(let player of players)
            expect(killer.InPlay(player)).is.eq(true);
    });

    it("Players not added are not in the game", () => {
        const killer = new KillerPool();
        addPlayers(killer, 2);

        const rouge = new Player("rouge");
        
        expect(killer.InPlay(rouge)).is.eq(false);
    });

    it("Players with 0 lives are out of the game", () => {
        const killer = new KillerPool();
        const players = addPlayers(killer, 3);
        killer.StartGame();

        killer.TakeShot(Shot.Foul(4));

        expect(killer.Lives(players[0])).is.eq(0);
        expect(killer.InPlay(players[0])).is.eq(false);
    });

    it("Players that are out, do not play shots", () => {
        const killer = new KillerPool();
        const players = addPlayers(killer, 3);
        killer.StartGame();

        killer.TakeShot(Shot.Foul(4)); // p0 is out
        killer.TakeShot(Shot.Pot(1)); // p1
        killer.TakeShot(Shot.Pot(1)); // p2
        killer.TakeShot(Shot.Pot(1)); // p1 (skiped p0 as out)

        expect(killer.InPlay(players[0])).is.eq(false);
        expect(killer.NextPlayer.Name).is.eq(players[2].Name);
    });

    
    it("Last player remaining wins", () => {
        const killer = new KillerPool();
        const players = addPlayers(killer, 3);
        killer.StartGame();

        killer.TakeShot(Shot.Foul(4)); // p0 is out
        killer.TakeShot(Shot.Pot(1)); // p1
        killer.TakeShot(Shot.Foul(3)); // p2 is out
  
        expect(killer.GameEnded).is.eq(true);
        if(killer.Winner)
            expect(killer.Winner.Name).is.eq(players[1].Name);
        else
            assert.fail("No winner after game ended");
    });

    it("Cannot take shots after game ended", () => {
        const killer = new KillerPool();
        addPlayers(killer, 2);
        killer.StartGame();
        killer.TakeShot(Shot.Foul(4));
        
        assert.throws(() => killer.TakeShot(Shot.Pot(1)), GameEnded);
    });
});