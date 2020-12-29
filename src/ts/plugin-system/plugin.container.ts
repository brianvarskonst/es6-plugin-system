/**
 * Plugin Container
 *
 * contains all definitions for all plugins
 */
export default class PluginContainer {

    public readonly registrationsKey = 'registrations';
    public readonly instancesKey = 'instances';
    public readonly classKey = 'class';
    public readonly nameKey = 'name';

    private storage: Map<string, Map<string, any>|any>;

    constructor() {
        this.storage = new Map();
    }

    /**
     * returns if the plugin is set to the registry
     *
     * @param {string} name
     * @param {string|null} selector
     *
     * @returns {boolean}
     */
    has(name: string, selector: string): boolean
    {
        if (!selector) {
            return this.storage.has(name);
        }

        if (!this.storage.has(name)) {
            this.storage.set(name, new Map());
        }

        const pluginMap = this.storage.get(name);

        if (!pluginMap.has(this.registrationsKey)) {
            return false;
        }

        return pluginMap.get(this.registrationsKey).has(selector);
    }

    /**
     * adds a plugin to the registry
     *
     * @param {string} name
     * @param {Object} plugin
     * @param {string|NodeList|HTMLElement} selector
     * @param {Object} options
     *
     * @returns {Map<any, any>}
     */
    set(
        name: string,
        plugin: object,
        selector: string|NodeList|HTMLElement,
        options: object
    ): Map<any, any> {

        if (!this.has(name)) {
            this.storage.set(name, new Map());
        }

        const pluginMap = this.storage.get(name);

        pluginMap.set(this.classKey, plugin);
        pluginMap.set(this.nameKey, name);

        if (!pluginMap.has(this.registrationsKey)) {
            pluginMap.set(this.registrationsKey, new Map());
        }

        if (!pluginMap.has(this.instancesKey)) {
            pluginMap.set(this.instancesKey, []);
        }

        const registrationMap = pluginMap.get(this.registrationsKey);

        if (selector) {
            registrationMap.set(selector, {selector, options});
        }

        return this;
    }

    /**
     * returns a plugin from the registry
     *
     * @param {string} name
     *
     * @returns {any}
     */
    get(name: string): any {
        return this.storage.get(name);
    }

    /**
     * removes a plugin from the registry
     *
     * @param {string} name
     * @param {string} selector
     *
     * @returns {PluginContainer}
     */
    delete(name: string, selector: string): PluginContainer | boolean
    {
        if (!selector) {
            return this.storage.delete(name);
        }

        const pluginMap = this.storage.get(name);

        if (!pluginMap) {
            return true;
        }

        const registrationMap = pluginMap.get(this.registrationsKey);

        if (!registrationMap) {
            return true;
        }

        registrationMap.delete(selector);

        return this;
    }

    /**
     * clears the registry
     *
     * @returns {PluginContainer}
     */
    clear(): PluginContainer
    {
        this.storage.clear();

        return this;
    }

    /**
     * returns all defined plugin names from the registry
     *
     * @returns {[any , any]}
     */
    keys()
    {
        return Array.from(this.storage).reduce(
            (accumulator, values) => {
                const [key, value] = values;

                accumulator[key] = value;

                return accumulator;
            }, {}
        );
    }

}