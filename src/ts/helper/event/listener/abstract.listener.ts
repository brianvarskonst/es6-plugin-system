export default abstract class AbstractListener implements NativeListenerInterface {
    eventName: string;
    callback: Function;
    opts: object;

    constructor(eventName: string, callback: Function, opts: object = {}) {
        this.eventName = eventName;
        this.callback = callback;
        this.opts = opts;
    }

    splitEventName(): string[]
    {
        return this.eventName.split('.');
    }

    static new(eventName: string, callback: Function, opts: object): NativeListenerInterface
    {
        return new self(eventName, callback, opts);
    }
}