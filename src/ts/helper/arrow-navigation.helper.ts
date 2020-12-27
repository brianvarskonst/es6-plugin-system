import DomAccess from './dom-access.helper';
import Iterator from './iterator.helper';

export default class ArrowNavigationHelper {

    public readonly ARROW_NAVIGATION_ACTIVE_CLASS = 'is-active';
    public readonly ARROW_NAVIGATION_ITERATOR_DEFAULT = -1;

    private readonly enterKey = 'Enter';
    private readonly arrowDownKey = 'ArrowDown';
    private readonly arrowUpKey = 'ArrowUp';

    private element: Element;
    private parentSelector: string;
    private itemSelector: string;
    private infinite: boolean;

    private iterator: number;
    private items: Element[];

    /**
     * Constructor.
     * @param {Element} element
     * @param {string} parentSelector
     * @param {string} itemSelector
     * @param {boolean} infinite
     */
    constructor(element: Element, parentSelector: string, itemSelector: string, infinite: boolean = true)
    {
        this.element = element;
        this.parentSelector = parentSelector;
        this.itemSelector = itemSelector;
        this.infinite = infinite;

        this.resetIterator();

        this.registerEvents();
    }

    /**
     * Reset the iterator
     */
    public resetIterator(): void
    {
        this.iterator = this.ARROW_NAVIGATION_ITERATOR_DEFAULT;
    }

    /**
     * Register events
     * @private
     */
    private registerEvents(): void {
        this.element.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    /**
     * Handle 'keydown' event
     * @param {Event} event
     * @private
     */
    private onKeyDown(event): void {
        const parent = DomAccess.querySelector(document, this.parentSelector, false);

        if (!parent) {
            return;
        }

        this.items = parent.querySelectorAll(this.itemSelector);

        // early return if no items exist
        if (this.items.length === 0) {
            return;
        }

        switch (event.key) {
            case this.enterKey:
                event.preventDefault();
                this.onPressEnter(event);
                return;
            case this.arrowDownKey:
                event.preventDefault();
                this.iterator++;
                break;
            case this.arrowUpKey:
                event.preventDefault();
                this.iterator--;
                break;
            default:
                return;
        }

        this.clampIterator();

        // remove all active classes
        Iterator.iterate(this.items, item => item.classList.remove(this.ARROW_NAVIGATION_ACTIVE_CLASS));

        // add active class to current iteration
        this.getCurrentSelection().classList.add(this.ARROW_NAVIGATION_ACTIVE_CLASS);
    }

    /**
     * When pressing "Enter" the link inside the currently
     * selected result item shall be clicked
     * @param {Event} event
     * @private
     */
    private onPressEnter(event): void {
        // handle the original form submit event only if no search result has been selected before
        if (this.iterator <= this.ARROW_NAVIGATION_ITERATOR_DEFAULT) {
            return;
        }

        event.preventDefault();

        try {
            const a = DomAccess.querySelector(this.getCurrentSelection(), 'a');

            a.click();
        } catch (e) {
            // do nothing, if no link has been found in result item
        }
    }

    /**
     * Return the currently selected search result item
     * @returns {Element}
     * @private
     */
    private getCurrentSelection(): Element {
        return this.items[this.iterator];
    }

    /**
     * Method to compromise the "out of bounds" case that occurs
     * if the iterator runs below zero or above the max threshold
     * @private
     */
    private clampIterator(): void {
        const max = this.getMaxItemCount();

        // set iterator to last item if below zero
        if (this.iterator < 0) {
            this.iterator = this.infinite ? max : 0;
        }

        // set iterator to first item if above max
        if (this.iterator > max) {
            this.iterator = this.infinite ? 0 : max;
        }
    }

    /**
     * Returns the upper bound of iterations by
     * using the amount of existing iterables
     * @returns {number}
     * @private
     */
    private getMaxItemCount(): number {
        return this.items.length - 1;
    }
}