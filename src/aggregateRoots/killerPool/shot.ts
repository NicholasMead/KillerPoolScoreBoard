import { ValueObject } from "../../framework/ValueObject";

export class Shot extends ValueObject{
    private _value: number;

    public constructor(value: number)
    {
        super();
        this._value = value;
    }

    public get Value(): number{
        return this._value;
    }

    public static Foul(severity?: number): Shot{
        if(!severity)
            return new Shot(-1);
        
        return new Shot(-severity);
    }

    public static Pass(): Shot{
        return new Shot(0);
    }

    public static Gain(lives?: number): Shot{
        if(!lives)
            return new Shot(1);
    
        return new Shot(lives);
    }
}