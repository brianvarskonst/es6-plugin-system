import Iterator from './iterator.helper';
import DomAccess from './dom-access.helper';

class ElementReplaceHelperSingleton {

    private domParser: DOMParser;

    constructor() {
        this.domParser = new DOMParser();
    }

    /**
     * replace all elements from the target
     *
     * @param {string|HTMLElement} markup
     * @param {array|string} selectors
     * @param {boolean} strict
     *
     * @private
     */
    public replaceFromMarkup(
        markup: string | HTMLElement,
        selectors: string[],
        strict: boolean = true
    ) {
        let src = markup;

        if (typeof src === 'string') {
            src = this.createMarkupFromString(src);
        }

        this.replaceSelectors(src, selectors, strict);
    }

    /**
     * replaces the target with the src elements
     *
     * @param {NodeList|HTMLElement|string} src
     * @param {NodeList|HTMLElement|string} target
     * @param {boolean} strict
     *
     * @returns {boolean}
     */
    public replaceElement(
        src: NodeList|HTMLElement|string,
        target: NodeList|HTMLElement|string,
        strict: boolean = true
    ) {
        if (typeof src === 'string') {
            src = DomAccess.querySelectorAll(document, src, strict);
        }

        if (typeof target === 'string') {
            target = DomAccess.querySelectorAll(document, target, strict);
        }

        if (src instanceof NodeList) {
            Iterator.iterate(src, (srcEl, index) => {
                if (srcEl.innerHTML) {
                    target[index].innerHTML = srcEl.innerHTML;
                }
            });
            return true;
        }

        if (target instanceof NodeList) {
            Iterator.iterate(target, (targetEl) => {
                if (src.innerHTML) {
                    targetEl.innerHTML = src.innerHTML;
                }
            });
            return true;
        }

        if (!target || !src || !src.innerHTML) {
            return false;
        }

        target.innerHTML = src.innerHTML;

        return true;
    }

    /**
     * replaces all found selectors in the document
     * with the ones in the source
     *
     * @param {HTMLElement} src
     * @param {string[]} selectors
     * @param {boolean} strict
     *
     * @private
     */
    private replaceSelectors(src: HTMLElement, selectors: string[], strict: boolean): void
    {
        Iterator.iterate(selectors, selector => {
            const srcElements = DomAccess.querySelectorAll(src, selector, strict);
            const targetElements = DomAccess.querySelectorAll(document, selector, strict);

            this.replaceElement(srcElements, targetElements, strict);
        });
    }

    /**
     * returns a dom element parsed from the passed string
     *
     * @param {string} string
     * @param {SupportedType} type
     *
     * @returns {Document | HTMLElement}
     *
     * @private
     */
    private createMarkupFromString(
        string: string,
        type: SupportedType = 'text/html'
    ): Document | HTMLElement {
        return this.domParser.parseFromString(string, type);
    }
}

/**
 * Create the ElementReplaceHelper instance.
 * @type {Readonly<ElementReplaceHelperSingleton>}
 */
export const ElementReplaceHelperInstance = Object.freeze(new ElementReplaceHelperSingleton());

export default class ElementReplaceHelper {

    /**
     * replace all elements from the target
     *
     * @param {string|HTMLElement} markup
     * @param {string[]} selectors
     * @param {boolean} strict
     *
     */
    static replaceFromMarkup(
        markup: string | HTMLElement,
        selectors: string[],
        strict: boolean
    ) {
        ElementReplaceHelperInstance.replaceFromMarkup(markup, selectors, strict);
    }

    /**
     * replaces the target with the src elements
     *
     * @param {NodeList|HTMLElement|string} src
     * @param {NodeList|HTMLElement|string} target
     * @param {boolean} strict
     *
     * @returns {boolean}
     */
    static replaceElement(
        src: NodeList|HTMLElement|string,
        target: NodeList|HTMLElement|string,
        strict: boolean
    ) {
        return ElementReplaceHelperInstance.replaceElement(src, target, strict);
    }
}