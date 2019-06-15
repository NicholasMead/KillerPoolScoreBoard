import { ValueObject } from "../../framework/ValueObject";

export class Player extends ValueObject {

    private _name: string;

    constructor(name: string) {
        super();
        this._name = name;
    }

    public get Name(): string {
        return this._name;
    }
}
