export interface NativeListenerInterface {
    eventName: string;
    callback: Function;
    opts: object;

    splitEventName(): string[];
}