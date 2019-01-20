//framework
import { expect, assert } from 'chai';
//model
import { KillerPool } from '../src/domain/aggregateRoots/killerPool';
import { Player } from '../src/domain/aggregateRoots/killerPool/player';
import { IEvent } from '../src/domain/framework/IEvent';
import { KillerPoolRepository } from '../src/repositories/KillerPoolRepository';
import { Shot } from '../src/domain/aggregateRoots/killerPool/shot';

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

const createKillerPool = (players: number): KillerPool => {
    const pool = new KillerPool();   
    addPlayers(pool, players);
    pool.StartGame();
    pool.TakeShot(Shot.Foul(1));
    return pool;
}

describe("KillerPoolRepository", () => {
    it("Can save and load KillerPool Game", () =>{
        const eventStore: IEvent[] = [];
        const pool = createKillerPool(5);
        const repo = new KillerPoolRepository(eventStore);

        repo.Save(pool);
        const savedPool = repo.GetById(pool.Id);

        expect(savedPool.Id).eq(pool.Id);
        for(let playerIndex in pool.Players)
        {
            const poolPlayer = pool.Players[playerIndex];
            const savedPlayer = savedPool.Players[playerIndex];
            expect(savedPlayer.Name).eq(poolPlayer.Name, "Player name doesn't match");
            expect(savedPool.Lives(savedPlayer)).eq(pool.Lives(poolPlayer), "Player lives do not match");
        }
        expect(savedPool.NextPlayer.Name).eq(pool.NextPlayer.Name, "Next player doesn't match");
        expect(savedPool.DomainEvents.length).eq(0);
    });
});
