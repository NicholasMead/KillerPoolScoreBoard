import { expect, assert } from 'chai';
import { KillerPool } from '../src/aggregateRoots/killerPool';
import { Guid } from '../src/services/guid';
import { Player } from '../src/aggregateRoots/killerPool/player';
import { GameAlreadyStarted } from '../src/errors/GameAlreadyStarted';
import { GameNotStarted } from '../src/errors/GameNotStarted';
import { InsufficientPlayersInGame } from '../src/errors/InsufficientPlayersInGame';
import { Shot } from '../src/aggregateRoots/killerPool/shot';

const addPlayer = (killerPool: KillerPool) : Player => {
    const playerCount = killerPool.Players.length;
    const player = new Player(`Player${playerCount + 1}`);
    killerPool.AddPlayer(player);
    return player;
}

const addPlayers = (killerPool: KillerPool, playerCount: number) : Player[] => {
    const players : Player[] = [];

    for(let i = 0; i < playerCount; i++)
    {
        players.push(addPlayer(killerPool));
    }    
    return players;
}

describe("KillerPool", () => {     

    it("Can add players", () => {
        const killer = new KillerPool(Guid.newGuid());
        const players = addPlayers(killer, 2);
        
        expect(killer.Players.length).to.eq(2);
        expect(killer.Players[0].Name).to.eq(players[0].Name);
        expect(killer.Players[1].Name).to.eq(players[1].Name);
    });

    it("Cannot add players after game started", () => {
        const killer = new KillerPool(Guid.newGuid());
        addPlayers(killer, 2);

        killer.StartGame();

        assert.throws(() => addPlayer(killer), GameAlreadyStarted);
    });

    it("Cannot start game twice", () => {
        const killer = new KillerPool(Guid.newGuid());
        addPlayers(killer, 2);
        killer.StartGame();

        assert.throws(() => killer.StartGame(), GameAlreadyStarted);
    });

    it("Cannot start game without 0 players", () => {
        const killer = new KillerPool(Guid.newGuid());

        assert.throws(() => killer.StartGame(), InsufficientPlayersInGame);
    });

    it("Cannot start game without 1 player", () => {
        const killer = new KillerPool(Guid.newGuid());
        addPlayer(killer);

        assert.throws(() => killer.StartGame(), InsufficientPlayersInGame);
    });

    it("All players start with 3 lives", () => {
        const killer = new KillerPool(Guid.newGuid());
        addPlayers(killer, 2);
        
        killer.StartGame();

        for(let player of killer.Players)
            expect(killer.Lives(player)).is.eq(3);
    });

    it("First player added shoots first", () => {
        const killer = new KillerPool(Guid.newGuid());
        const players = addPlayers(killer, 2);
        
        killer.StartGame();

        expect(killer.NextPlayer.Name).is.eq(players[0].Name);
    });

    it("Cannot get next player before the game starts", () => {
        const killer = new KillerPool(Guid.newGuid());
        addPlayers(killer, 2);

        assert.throws(() => killer.NextPlayer, GameNotStarted);
    });

    it("Cannot shoot before the game starts", () => {
        const killer = new KillerPool(Guid.newGuid());

        assert.throws(() => killer.TakeShot(Shot.Pot(1)), GameNotStarted);
    });

    it("Shooting a foul loses 1 life", () => {
        const killer = new KillerPool(Guid.newGuid());
        const players = addPlayers(killer, 2);
        killer.StartGame();

        killer.TakeShot(Shot.Foul());

        expect(killer.Lives(players[0])).is.eq(2);
        expect(killer.Lives(players[1])).is.eq(3);
    });

    it("Shooting a multi foul loses many lifes", () => {
        const killer = new KillerPool(Guid.newGuid());
        const players = addPlayers(killer, 2);
        killer.StartGame();

        killer.TakeShot(Shot.Foul(2));

        expect(killer.Lives(players[0])).is.eq(1);
        expect(killer.Lives(players[1])).is.eq(3);
    });

    it("Potting single ball maintains lifes", () => {
        const killer = new KillerPool(Guid.newGuid());
        const players = addPlayers(killer, 2);
        killer.StartGame();

        killer.TakeShot(Shot.Pot(1));

        expect(killer.Lives(players[0])).is.eq(3);
        expect(killer.Lives(players[1])).is.eq(3);
    });

    it("Potting multiple balls adds lifes", () => {
        const killer = new KillerPool(Guid.newGuid());
        const players = addPlayers(killer, 2);
        killer.StartGame();

        killer.TakeShot(Shot.Pot(3));

        expect(killer.Lives(players[0])).is.eq(5);
        expect(killer.Lives(players[1])).is.eq(3);
    });

    it("After takeing a shot, its the next players turn", () => {
        const killer = new KillerPool(Guid.newGuid());
        const players = addPlayers(killer, 2);
        killer.StartGame();

        killer.TakeShot(Shot.Pot(1));

        expect(killer.NextPlayer.Name).is.eq(players[1].Name);
    });

    it("First player shoots after last player", () => {
        const killer = new KillerPool(Guid.newGuid());
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
        const killer = new KillerPool(Guid.newGuid());
        const players = addPlayers(killer, 3);
        
        killer.StartGame();

        for(let player of players)
            expect(killer.InPlay(player)).is.eq(true);
    });

    it("Players not added are not in the game", () => {
        const killer = new KillerPool(Guid.newGuid());
        addPlayers(killer, 2);

        const rouge = new Player("rouge");
        
        expect(killer.InPlay(rouge)).is.eq(false);
    });

    it("Players with 0 lives are out of the game", () => {
        const killer = new KillerPool(Guid.newGuid());
        const players = addPlayers(killer, 2);
        killer.StartGame();

        killer.TakeShot(Shot.Foul(4));

        expect(killer.Lives(players[0])).is.eq(0);
        expect(killer.InPlay(players[0])).is.eq(false);
    });
});