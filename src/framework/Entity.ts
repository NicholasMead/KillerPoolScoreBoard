import { IEvent } from './IEvent';

export class Entity<T> {

    _handlers: { [event: string]: (event: IEvent) => void };

    private _domainEvents: IEvent[] = [];
    public get DomainEvents(): IEvent[] {
        return this._domainEvents;
    }

    protected _id: T;
    public get Id(): T {
        return this._id;
    }

    protected constructor(id: T) {
        this._id = id;
        this._handlers = {};
    }

    protected Register(event: string, handler: (event: IEvent) => void) {
        this._handlers[event] = handler;
    }

    protected Raise(event: IEvent) {
        this._domainEvents.push(event);
        this.ApplyEvent(event);
    }

    public ClearEvents() {
        this._domainEvents = [];
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

    public ApplyEvent(event: IEvent) {
        var handler = this._handlers[event.Type];

        handler ? handler(event) : {};
    }
}