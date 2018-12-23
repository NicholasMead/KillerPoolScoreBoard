import { IEvent } from "../framework/IEvent";
import { Player } from "../models/Player";
import { PlayerCreated } from "../events/PlayerCreated";
import { IPlayerEvent } from '../events/abstractions/IPlayerEvent'

export class PlayerRepository {
    _eventStore: IEvent[];

    public constructor(eventStore: IEvent[]) {
        this._eventStore = eventStore;
    }

    public Add(player: Player) {
        player
            .PopEvents()
            .forEach(event => {
                this._eventStore.push(event);
            })
    }

    public GetAll(): { [name: string]: Player } {
        return mapReduce<IEvent, { [name: string]: Player }>(this._eventStore, {}, (players, event) => {
            if (event.Type == PlayerCreated.TypeName) {
                var player = Player.CreateDefaultPlayer();
                player.ApplyEvent(event);
                players[player.Name] = player;
            }

            return players;
        })
    }
}

function mapReduce<TSource, TOut>(
    source: TSource[],
    initial: TOut,
    reducer: (reduction: TOut, element: TSource) => TOut): TOut {

    var output = initial;

    source.forEach(element => {
        output = reducer(output, element);
    });

    return output;
}