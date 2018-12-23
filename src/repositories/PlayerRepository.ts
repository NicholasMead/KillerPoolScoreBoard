import { IEvent } from "../framework/IEvent";
import { Player } from "../models/Player";
import { PlayerCreated } from "../events/PlayerCreated";

export class PlayerRepository {
    _eventStore: IEvent[];

    public constructor(eventStore: IEvent[]) {
        this._eventStore = eventStore;
    }

    public GetPlayers(): Player[] {
        return mapReduce<IEvent, Player[]>(this._eventStore, [], (players, event) => {
            if (event.Type == PlayerCreated.TypeName)
            {
                var player = Player.CreateDefaultPlayer();
                player.ApplyEvent(event);
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