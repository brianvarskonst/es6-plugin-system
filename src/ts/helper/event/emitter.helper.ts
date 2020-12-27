import {EventEmitter} from "./emitter.interface";
import {NativeListenerInterface} from "./listener.interface";

export default class NativeEventEmitter implements EventEmitter {

    public _el: Document|HTMLElement;
    public _listeners;

    get el(): Document|HTMLElement {
        return this._el;
    }

    set el(value: Document|HTMLElement) {
        this._el = value;
    }

    get listeners() {
        return this._listeners;
    }

    /**
     * @param {{splitEventName: string, opts: object, cb: Function}} value
     */
    set listeners(value: object) {
        this._listeners.push(value);
    }

    /**
     * Event Emitter which works with the provided DOM element. The class isn't meant to be
     * extended. It should rather being used as a mixin component to provide the ability to
     * publish events.
     *
     * @example
     * const emitter = new NativeEventEmitter();
     * emitter.publish('my-event-name');
     *
     * @example using custom data
     * const emitter = new NativeEventEmitter();
     * emitter.subscribe('my-event-name', (event) => {
     *     console.log(event.detail);
     * });
     * emitter.publish('my-event-name', { custom: 'data' });
     *
     * @example using a custom scope
     * const emitter = new NativeEventEmitter();
     * emitter.subscribe('my-event-name', (event) => {
     *     console.log(event.detail);
     * }, { scope: myScope });
     * emitter.publish('my-event-name', { custom: 'data' });
     *
     * @example once listeners
     * const emitter = new NativeEventEmitter();
     * emitter.subscribe('my-event-name', (event) => {
     *     console.log(event.detail);
     * }, { once: true });
     * emitter.publish('my-event-name', { custom: 'data' });
     *
     * @constructor
     * @param {Document|HTMLElement} [el = document]
     */
    constructor(el: Document|HTMLElement = document)
    {
        this._el = el
        el.$emitter = this;
        this._listeners = [];
    }

    /**
     * Publishes an event on the element. Additional information can be added using the `data` parameter.
     * The data are accessible in the event handler in `event.detail` which represents the standard
     * implementation.
     */
    public publish(eventName: string, detail: object = {}): void
    {
        const event = new CustomEvent(eventName, {
            detail,
        });

        this._el.dispatchEvent(event);
    }

    /**
     * Subscribes to an event and adds a listener.
     *
     * @param {NativeListenerInterface} listener
     */
    public subscribe(listener: NativeListenerInterface): boolean
    {
        const emitter = this;
        const splitEventName = listener.eventName.split('.');
        const context = listener.opts;
        const callback = listener.callback;

        let cb = context.scope ? callback.bind(context.scope) : callback;

        // Support for listeners which are fired once
        if (context.once && context.once === true) {
            const onceCallback = cb;

            cb = function onceListener(event) {
                emitter.unsubscribe(listener.eventName);
                onceCallback(event);
            };
        }

        this._el.addEventListener(splitEventName[0], cb);

        this.listeners =
            {
                splitEventName,
                context,
                cb,
            }
        ;

        return true;
    }

    /**
     * Removes an event listener.
     *
     * @param {String} eventName
     *
     * @return {boolean}
     */
    public unsubscribe(eventName: string): boolean
    {
        const splitEventName = eventName.split('.');

        this._listeners = this._listeners.reduce((accumulator, listener) => {
            const foundEvent = listener.splitEventName.sort().toString() === splitEventName.sort().toString();

            if (foundEvent) {
                this._el.removeEventListener(listener.splitEventName[0], listener.cb);

                return accumulator;
            }

            accumulator.push(listener);

            return accumulator;
        }, []);

        return true;
    }

    /**
     * Resets the listeners
     *
     * @return {boolean}
     */
    public reset(): boolean
    {
        // Loop through the event listener and remove them from the element
        this._listeners.forEach((listener) => {
            this._el.removeEventListener(listener.splitEventName[0], listener.cb);
        });

        // Reset registry
        this._listeners = [];

        return true;
    }
}