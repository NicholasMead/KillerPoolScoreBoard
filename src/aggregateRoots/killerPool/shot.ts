import { ValueObject } from "../../framework/ValueObject";

export class Shot extends ValueObject{
    private _value: number;

    private constructor(value: number)
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
        
        this.throwIfNotInteger(severity, "severity");
        return new Shot(-severity);
    }

    public static Pot(ballCount: number): Shot{
        this.throwIfNotInteger(ballCount, "ballCount");
        if(ballCount < 0)
            throw new Error(`Cannot pot ${ballCount} balls.`)

        return new Shot(ballCount - 1);
    }

    private static throwIfNotInteger(number: number, paramName: string){
        if(number % 1 !== 0)
            throw new Error(`Paramater [${paramName}] must be an integer.`)
    }
}