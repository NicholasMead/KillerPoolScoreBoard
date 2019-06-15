import { IEvent } from './IEvent';

export abstract class Entity <TIdentifier>
{
    private _handlers: { [event: string]: (event: IEvent) => void } = {};
    private _domainEvents: IEvent[] = [];
    private _id: TIdentifier;

    protected constructor(id: TIdentifier){
        this._id = id;
    }

    public get DomainEvents(): IEvent[] {
        return this._domainEvents;
    }

    public get Id(): TIdentifier{
        return this._id;
    }
    
    protected Register(event: string, handler: (event: IEvent) => void) {
        if(this._handlers[event])
            throw new Error(`Handler already registered for event: [${event}]`);

        this._handlers[event] = handler;
    }

    protected Raise(event: IEvent)
    {
        this.ApplyEvent(event);
        this._domainEvents.push(event);
    }

    public PopEvents(): IEvent[] {
        var events: IEvent[] = [];

        do {
            var event = this._domainEvents.pop();
            event ? events.push(event) : {};
        } 
        while (event);

        return events;
    }

    public ClearEvents(): void {
        this._domainEvents = [];
    }

    public ApplyEvent(event: IEvent) {
        var handler = this._handlers[event.Type];
        if(!handler)
            throw new Error(`Cannot handle event ${event.Type}`)

        handler(event);
    }
}