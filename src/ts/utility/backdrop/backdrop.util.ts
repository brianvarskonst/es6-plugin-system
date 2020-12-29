import DeviceDetection from "../../helper/device-detection.helper";
import Iterator from '../../helper/iterator.helper';

class BackdropSingleton {

    public static selectorClass: string = 'modal-backdrop';
    public static openClass: string = 'modal-backdrop-open';
    public static noScrollClass: string = 'no-scroll';
    public static removeDelay: number = 350;
    public static events: object = {
        onClick: 'backdrop/onclick'
    };
    public static insertPosition: InsertPosition = 'beforeend';

    /**
     * Constructor
     * @returns {BackdropSingleton|*}
     */
    constructor() {
        if (!BackdropSingleton.instance) {
            BackdropSingleton.instance = this;
        }
        return BackdropSingleton.instance;
    }

    /**
     * Insert a backdrop to document.body and set a class
     * to the body to override default scrolling behaviour
     *
     * @param {Function|null} callback
     */
    public create(callback: Function | null): void
    {
        // avoid multiple backdrops
        this.removeExistingBackdrops();

        document.body.insertAdjacentHTML(BackdropSingleton.insertPosition, this.getTemplate());
        const backdrop = document.body.lastChild;

        // override body scroll behaviour
        document.documentElement.classList.add(BackdropSingleton.noScrollClass);

        // add open class afterwards to make any css animation effects possible
        setTimeout(() => {
            backdrop.classList.add(BackdropSingleton.openClass);

            // if a callback function is being injected execute it after opening the backdrop
            if (typeof callback === 'function') {
                callback();
            }
        }, 75);

        this.dispatchEvents();
    }

    /**
     * Close backdrop
     *
     * @param {number} delay
     */
    public remove(delay: number = BackdropSingleton.removeDelay): void
    {
        // remove open class to make any css animation effects possible
        const backdrops = this.getBackdrops();

        Iterator.iterate(
            backdrops,
            backdrop => backdrop.classList.remove(BackdropSingleton.openClass)
        );

        // wait before removing backdrop to let css animation effects take place
        setTimeout(this.removeExistingBackdrops.bind(this), delay);

        // remove body scroll behaviour override
        document.documentElement.classList.remove(BackdropSingleton.noScrollClass);
    }

    /**
     * Dispatch events
     * @private
     */
    private dispatchEvents(): void
    {
        const event = DeviceDetection.isTouchDevice() ? 'touchstart' : 'click';

        document.addEventListener(event, e => {
            if (e.target.classList.contains(BackdropSingleton.selectorClass)) {
                Object.keys(BackdropSingleton.events).forEach(event => {
                    document.dispatchEvent(new CustomEvent(event));
                })
            }
        });
    }

    /**
     * Determine list of existing backdrops
     * 
     * @returns {NodeListOf<Element>}
     */
    private getBackdrops(): NodeListOf<Element>
    {
        return document.querySelectorAll(`.${BackdropSingleton.selectorClass}`);
    }

    /**
     * Remove all existing backdrops from DOM
     * @private
     */
    private removeExistingBackdrops(): void
    {
        if (this.exists() === false) {
            return;
        }

        const backdrops = this.getBackdrops();

        Iterator.iterate(backdrops, backdrop => backdrop.remove());
    }

    /**
     * Checks if a backdrop already exists
     *
     * @returns {boolean}
     */
    private exists(): boolean
    {
        return document.querySelectorAll(`.${BackdropSingleton.selectorClass}`).length > 0;
    }

    /**
     * The backdrops HTML template definition
     *
     * @returns {string}
     */
    private getTemplate(): string
    {
        return `<div class="${BackdropSingleton.selectorClass}"></div>`;
    }
}

/**
 * Create the Backdrop instance.
 * @type {Readonly<BackdropSingleton>}
 */
export const BackdropInstance = Object.freeze(new BackdropSingleton());

export default class Backdrop {

    /**
     * Open the Backdrop
     *
     * @param {function|null} callback
     */
    public static create(callback?: Function) {
        BackdropInstance.create(callback);
    }

    /**
     * Close the Backdrop
     *
     * @param {number} delay
     */
    public static remove(delay: number = BackdropSingleton.removeDelay) {
        BackdropInstance.remove(delay);
    }

    /**
     * Expose constant
     *
     * @returns {string}
     */
    public static selectorClass() {
        return BackdropSingleton.removeDelay;
    }
}