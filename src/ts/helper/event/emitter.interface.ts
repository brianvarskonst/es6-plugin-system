export interface EventEmitter {
    publish(eventName: string, detail: object): void;

    subscribe(listener: NativeListenerInterface): boolean;

    unsubscribe(eventName: string): boolean;

    reset(): boolean;
}