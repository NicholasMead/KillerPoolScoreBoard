import { expect, assert } from 'chai';
import { KillerPool } from '../src/aggregateRoots/killerPool';
import { Guid } from '../src/services/guid';
import { Player } from '../src/aggregateRoots/killerPool/player';
import { GameAlreadyStarted } from '../src/errors/GameAlreadyStarted';

describe(typeof KillerPool, () => {     

    it("Can add players", () => {
        const killer = new KillerPool(Guid.newGuid());
        const player1 = new Player("Nick");
        const player2 = new Player("Rupe");
        
        killer.AddPlayer(player1);
        killer.AddPlayer(player2);
        
        expect(killer.Players.length).to.eq(2);
        expect(killer.Players[0]).to.eq(player1);
        expect(killer.Players[1]).to.eq(player2);
    });

    it("Cannot add players after game started", () => {
        const killer = new KillerPool(Guid.newGuid());
        const player = new Player("Nick");
     
        killer.StartGame();
        assert.throws(() => killer.AddPlayer(player), GameAlreadyStarted);
    });

    it("Cannot start game twice", () => {
        const killer = new KillerPool(Guid.newGuid());
     
        killer.StartGame();

        assert.throws(() => killer.StartGame(), GameAlreadyStarted);
    });
});