import Debouncer from './debouncer.helper.ts';

/**
 * Viewport Detection
 */

export default class ViewportDetection {

    public readonly RESIZE_DEBOUNCE_TIME = 200;

    private previousViewport: string;
    private currentViewport: string;

    /**
     * Constructor
     */
    constructor() {
        this.previousViewport = null;
        this.currentViewport = ViewportDetection.getCurrentViewport();

        this.registerEvents();
    }

    /**
     * Register events
     */
    public registerEvents(): void {
        // add listener on DOMContentLoaded to initially register viewport events
        window.addEventListener('DOMContentLoaded', this.onDOMContentLoaded.bind(this));

        // add listener to the window resize events
        window.addEventListener(
            'resize',
            Debouncer.debounce(this.onResize.bind(this), this.RESIZE_DEBOUNCE_TIME),
            {
                capture: true,
                passive: true,
            }
        );
    }

    /**
     * Dispatch the custom viewport events immediately after DOM content
     * has been loaded to allow the execution of other JS code via listening the events
     */
    private onDOMContentLoaded(): void
    {
        this.dispatchEvents();
    }

    /**
     * Dispatch the custom viewport event after window resizing
     * to allow the execution of other JS code via listening the events
     */
    private onResize(): void
    {
        if (this.viewportHasChanged(ViewportDetection.getCurrentViewport())) {
            this.dispatchEvents();

            // dispatch event that a viewport change has taken place
            this.dispatchViewportEvent('Viewport/hasChanged');
        }
    }

    /**
     * Dispatch custom events for every single viewport
     * @private
     */
    private dispatchEvents(): void
    {
        // dispatch specific events for each single viewport
        switch (true) {
            case ViewportDetection.isXS():
                this.dispatchViewportEvent('Viewport/isXS');
                break;
            case ViewportDetection.isSM():
                this.dispatchViewportEvent('Viewport/isSM');
                break;
            case ViewportDetection.isMD():
                this.dispatchViewportEvent('Viewport/isMD');
                break;
            case ViewportDetection.isLG():
                this.dispatchViewportEvent('Viewport/isLG');
                break;
            case ViewportDetection.isXL():
                this.dispatchViewportEvent('Viewport/isXL');
                break;
            default:
                break;

        }
    }

    /**
     * Determine whether the the viewport has changed
     *
     * @param newViewport
     *
     * @returns {boolean}
     */
    private viewportHasChanged(newViewport): boolean
    {
        // determine whether the viewport has changed
        const hasChanged = newViewport !== this.currentViewport;

        if (hasChanged) {
            this.previousViewport = this.currentViewport;
            this.currentViewport = newViewport;
        }

        return hasChanged;
    }

    /**
     * Dispatch event with additional data
     * including the previous viewport
     * @param {string} eventName
     */
    private dispatchViewportEvent(eventName): void
    {
        window.$emitter.publish(eventName, {
            previousViewport: this.previousViewport,
        });
    }

    /**
     * Determine whether the current viewport is XS
     * @returns {boolean}
     */
    public static isXS(): boolean
    {
        return (ViewportDetection.getCurrentViewport() === 'XS');
    }

    /**
     * Determine whether the current viewport is SM
     * @returns {boolean}
     */
    public static isSM(): boolean
    {
        return (ViewportDetection.getCurrentViewport() === 'SM');
    }

    /**
     * Determine whether the current viewport is MD
     * @returns {boolean}
     */
    public static isMD(): boolean
    {
        return (ViewportDetection.getCurrentViewport() === 'MD');
    }

    /**
     * Determine whether the current viewport is LG
     * @returns {boolean}
     */
    public static isLG(): boolean
    {
        return (ViewportDetection.getCurrentViewport() === 'LG');
    }

    /**
     * Determine whether the current viewport is XL
     * @returns {boolean}
     */
    public static isXL(): boolean
    {
        return (ViewportDetection.getCurrentViewport() === 'XL');
    }

    /**
     * Determine the current viewport value set in the HTML::before element,
     * remove all quotes and convert it to uppercase
     *
     * @returns {string}
     */
    public static getCurrentViewport(): string
    {
        const viewport = window.getComputedStyle(document.documentElement, ':before').content;

        return viewport.replace(/['"]+/g, '').toUpperCase();
    }
}