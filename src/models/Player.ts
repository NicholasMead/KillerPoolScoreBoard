import { Entity } from "../framework/Entity";
import { PlayerCreated } from "../events/PlayerCreated";

export class Player extends Entity<string> {

    private constructor(name: string) {
        super(name)
        this.Register(PlayerCreated.TypeName, ev => {
            var playerCreatedEvent = ev as PlayerCreated;
            if(!playerCreatedEvent)
                return;
            
            this._id = playerCreatedEvent.Name;
        })
    }

    public get Name(): string {
        return this.Id;
    }

    public static CreateNewPlayer(name: string) : Player { 
        var player = this.CreateDefaultPlayer();
            
        player.Raise(new PlayerCreated(name));

        return player;
    }

    public static CreateDefaultPlayer()
    {
        return new Player("");
    }
}
