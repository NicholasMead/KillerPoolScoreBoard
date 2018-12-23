export class Player {

    public constructor(name: string) {
        this.Name = name;
    }

    public Name: string;
}

export class StartNewGame
{
    public constructor(players: Player[])
    {
        this.Players = players;
    }
    
    public Players : Player[];
}
