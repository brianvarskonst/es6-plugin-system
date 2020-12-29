import deepmerge from 'deepmerge';
import PluginContainer from './plugin.container';
import DomAccess from '../helper/dom-access.helper';
import './plugin.config.manager.ts';
import Iterator from '../helper/iterator.helper';
import Plugin from "./plugin.class";

/**
 * this file handles the plugin functionality of shopware
 *
 * to use the PluginManager import:
 * ```
 *     import PluginManager from 'src/helper/plugin/plugin.manager';
 *
 *     PluginManager.register(.....);
 *
 *     PluginManager.initializePlugins(.....);
 * ```
 *
 * to extend from the base plugin import:
 * ```
 *     import Plugin from 'src/helper/plugin/plugin.class';
 *
 *     export default MyFancyPlugin extends Plugin {}
 * ```
 *
 * methods:
 *
 * // Registers a plugin to the plugin manager.
 * PluginManager.register(pluginName: String, pluginClass: Plugin, selector: String | NodeList | HTMLElement, options?: Object): *;
 *
 * // Removes a plugin from the plugin manager.
 * PluginManager.deregister(pluginName: String): *;
 *
 * // Extends an already existing plugin with a new class or function.
 * // If both names are equal, the plugin will be overridden.
 * PluginManager.extend(fromName: String, newName: String, pluginClass: Plugin, selector: String | NodeList | HTMLElement, options?: Object): boolean;
 *
 * // Returns a list of all registered plugins.
 * PluginManager.getPluginList(): *;
 *
 * // Returns the definition of a plugin.
 * PluginManager.getPlugin(pluginName: String): Map : null;
 *
 * // Returns all registered plugin instances for the passed plugin name.
 * PluginManager.getPluginInstances(pluginName: String): Map : null;
 *
 * // Returns the plugin instance from the passed element selected by plugin mame.
 * PluginManager.getPluginInstanceFromElement(el: HTMLElement, pluginName: String): Object | null;
 *
 * // Returns all plugin instances from the passed element.
 * PluginManager.getPluginInstancesFromElement(el: HTMLElement): Map : null;
 *
 * // Initializes all plugins which are currently registered.
 * PluginManager.initializePlugins(): *;
 *
 * // Initializes a single plugin.
 * PluginManager.initializePlugin(pluginName: String|boolean, selector: String | NodeList | HTMLElement, options?: Object): *;
 *
 */
class PluginManagerSingleton {

    private registry: PluginContainer;

    constructor() {
        this.registry = new PluginContainer();
    }

    /**
     * Registers a plugin to the plugin manager.
     *
     * @param {string} pluginName
     * @param {Plugin} pluginClass
     * @param {string|NodeList|HTMLElement} selector
     * @param {Object} options
     *
     * @returns {*}
     */
    public register(
        pluginName: string,
        pluginClass: Plugin,
        selector: string | NodeList | HTMLElement | Document = document,
        options = {}
    ): any {
        if (this.registry.has(pluginName, selector)) {
            throw new Error(`Plugin "${pluginName}" is already registered.`);
        }

        return this.registry.set(pluginName, pluginClass, selector, options);
    }

    /**
     * Removes a plugin from the plugin manager.
     *
     * @param {string} pluginName
     * @param {string} selector
     *
     * @returns {*}
     */
    public deregister(pluginName: string, selector: string | Document = document): any
    {
        if (!this.registry.has(pluginName, selector)) {
            throw new Error(`The plugin "${pluginName}" is not registered.`);
        }

        return this.registry.delete(pluginName, selector);
    }

    /**
     * Extends an already existing plugin with a new class or function.
     * If both names are equal, the plugin will be overridden.
     *
     * @param {string} fromName
     * @param {string} newName
     * @param {Plugin} pluginClass
     * @param {string|NodeList|HTMLElement} selector
     * @param {Object} options
     *
     * @returns {boolean}
     */
    public extend(
        fromName: string,
        newName: string,
        pluginClass: Plugin,
        selector: string | NodeList | HTMLElement | Document = document,
        options: object = {}
    ): boolean {
        // Register the plugin under a new name
        // If the name is the same, replace it
        if (fromName === newName) {
            this.deregister(fromName, selector);

            return this.register(newName, pluginClass, selector, options);
        }

        return this.extendPlugin(fromName, newName, pluginClass, selector, options);
    }

    /**
     * Returns a list of all registered plugins.
     *
     * @returns {*}
     */
    public getPluginList(): any
    {
        return this.registry.keys();
    }

    /**
     * Returns the definition of a plugin.
     *
     * @param {string} pluginName
     * @param {boolean} strict
     *
     * @returns {Map|null}
     */
    public getPlugin(pluginName: string, strict: boolean = true): Map<any, any> | null
    {
        if (!pluginName) {
            throw new Error('A plugin name must be passed!');
        }

        if (!this.registry.has(pluginName)) {
            if (strict) {
                throw new Error(`The plugin "${pluginName}" is not registered. You might need to register it first.`);
            } else {
                this.registry.set(pluginName);
            }
        }

        return this.registry.get(pluginName);
    }

    /**
     * Returns all registered plugin instances for the passed plugin name.
     *
     * @param {string} pluginName
     *
     * @returns {Map|null}
     */
    public getPluginInstances(pluginName: string): Map<any, any> | null
    {
        const plugin = this.getPlugin(pluginName);

        return plugin.get('instances');
    }

    /**
     * Returns the plugin instance from the passed element selected by plugin Name.
     *
     * @param {HTMLElement} el
     * @param {String} pluginName
     *
     * @returns {Object|null}
     */
    public static getPluginInstanceFromElement(el, pluginName): object | null
    {
        const instances = PluginManagerSingleton.getPluginInstancesFromElement(el);

        return instances.get(pluginName);
    }

    /**
     * Returns all plugin instances from the passed element.
     *
     * @param {HTMLElement} el
     *
     * @returns {Map|null}
     */
    public static getPluginInstancesFromElement(el: HTMLElement): Map<any, any> | null
    {
        if (!DomAccess.isNode(el)) {
            throw new Error('Passed element is not an Html element!');
        }

        el.__plugins = el.__plugins || new Map();

        return el.__plugins;
    }

    /**
     * Initializes all plugins which are currently registered.
     */
    public initializePlugins(): void
    {
        const initializationFailures = [];

        Iterator.iterate(this.getPluginList(), (plugin, pluginName) => {
            if (pluginName) {
                if (!this.registry.has(pluginName)) {
                    throw new Error(`The plugin "${pluginName}" is not registered.`);
                }

                const plugin = this.registry.get(pluginName);

                if (plugin.has('registrations')) {
                    Iterator.iterate(plugin.get('registrations'), entry => {
                        try {
                            this._initializePlugin(plugin.get('class'), entry.selector, entry.options, plugin.get('name'));
                        } catch (failure) {
                            initializationFailures.push(failure);
                        }
                    });
                }
            }
        });

        initializationFailures.forEach(failure => {
            console.error(failure);
        })
    }

    /**
     * Initializes a single plugin.
     *
     * @param {Object} pluginName
     * @param {String|NodeList|HTMLElement} selector
     * @param {Object} options
     */
    public initializePlugin(
        pluginName: object,
        selector: string | NodeList | HTMLElement | Document,
        options: object
    ): any {
        let plugin;
        let pluginClass;
        let mergedOptions;

        if (this.registry.has(pluginName, selector)) {
            plugin = this.registry.get(pluginName, selector);

            const registrationOptions = plugin.get('registrations').get(selector);

            pluginClass = plugin.get('class');

            mergedOptions = deepmerge(
                pluginClass.options || {},
                deepmerge(registrationOptions.options || {},
                options || {})
            );
        } else {
            plugin = this.registry.get(pluginName);
            pluginClass = plugin.get('class');
            mergedOptions = deepmerge(
                pluginClass.options || {},
                options || {}
            );
        }

        this.initPlugin(pluginClass, selector, mergedOptions, plugin.get('name'));
    }

    /**
     * Executes a vanilla plugin class.
     *
     * @param {Plugin} pluginClass
     * @param {String|NodeList|HTMLElement} selector
     * @param {Object} options
     * @param {string} pluginName
     */
    private initPlugin(pluginClass, selector, options, pluginName = false) {
        if (DomAccess.isNode(selector)) {
            return PluginManagerSingleton.initializePluginOnElement(selector, pluginClass, options, pluginName);
        }

        if (typeof selector === 'string') {
            selector = document.querySelectorAll(selector);
        }

        return Iterator.iterate(selector, el => {
            PluginManagerSingleton.initializePluginOnElement(el, pluginClass, options, pluginName);
        });
    }

    /**
     * Executes a vanilla plugin class on the passed element.
     *
     * @param {String|NodeList|HTMLElement} el
     * @param {Plugin} pluginClass
     * @param {Object} options
     * @param {string} pluginName
     * @private
     */
    private static initializePluginOnElement(
        el: string | NodeList | HTMLElement,
        pluginClass: Plugin,
        options: object,
        pluginName: string
    ): any {
        if (typeof pluginClass !== 'function') {
            throw new Error('The passed plugin is not a function or a class.');
        }

        const instance = PluginManager.getPluginInstanceFromElement(el, pluginName);

        if (!instance) {
            return new pluginClass(el, options, pluginName);
        }

        return instance._update();
    }

    /**
     * extends a plugin class with another class or function.
     *
     * @param {string} fromName
     * @param {string} newName
     * @param {Plugin} pluginClass
     * @param {string|NodeList|HTMLElement} selector
     * @param {Object} options
     *
     * @returns {*}
     */
    private extendPlugin(
        fromName: string,
        newName: string,
        pluginClass: Plugin,
        selector: string | NodeList | HTMLElement,
        options: object = {}
    ): any {
        if (!this.registry.has(fromName, selector)) {
            throw new Error(`The plugin "${fromName}" is not registered.`);
        }

        // get current plugin
        const extendFrom = this.registry.get(fromName);
        const parentPlugin = extendFrom.get('class');
        const mergedOptions = deepmerge(parentPlugin.options || {}, options || {});

        // Create plugin
        class InternallyExtendedPlugin extends parentPlugin {
        }

        // Extend the plugin with the new definitions
        InternallyExtendedPlugin.prototype = Object.assign(InternallyExtendedPlugin.prototype, pluginClass);
        InternallyExtendedPlugin.prototype.constructor = InternallyExtendedPlugin;

        return this.register(newName, InternallyExtendedPlugin, selector, mergedOptions);
    }
}

/**
 * Create the PluginManager instance.
 * @type {Readonly<PluginManagerSingleton>}
 */
export const PluginManagerInstance = Object.freeze(new PluginManagerSingleton());

export default class PluginManager {

    constructor() {
        window.PluginManager = this;
    }

    /**
     * Registers a plugin to the plugin manager.
     *
     * @param {string} pluginName
     * @param {Plugin} pluginClass
     * @param {string|NodeList|HTMLElement} selector
     * @param {Object} options
     *
     * @returns {*}
     */
    public static register(
        pluginName: string,
        pluginClass: Plugin,
        selector = document,
        options = {}
    ): any {
        return PluginManagerInstance.register(pluginName, pluginClass, selector, options);
    }

    /**
     * Removes a plugin from the plugin manager.
     *
     * @param {string} pluginName
     * @param {string} selector
     *
     * @returns {*}
     */
    public static deregister(pluginName: string, selector: string): any
    {
        return PluginManagerInstance.deregister(pluginName, selector);
    }

    /**
     * Extends an already existing plugin with a new class or function.
     * If both names are equal, the plugin will be overridden.
     *
     * @param {string} fromName
     * @param {string} newName
     * @param {Plugin} pluginClass
     * @param {string|NodeList|HTMLElement} selector
     * @param {Object} options
     *
     * @returns {boolean}
     */
    public static extend(
        fromName: string,
        newName: string,
        pluginClass: Plugin,
        selector: string | NodeList | HTMLElement,
        options: object = {}
    ) {
        return PluginManagerInstance.extend(fromName, newName, pluginClass, selector, options);
    }

    public static override(
        overrideName: string,
        pluginClass: Plugin,
        selector: string | NodeList | HTMLElement,
        options: object = {}
    ): any {
        return PluginManagerInstance.extend(overrideName, overrideName, pluginClass, selector, options);
    }

    /**
     * Returns a list of all registered plugins.
     *
     * @returns {*}
     */
    public static getPluginList(): any
    {
        return PluginManagerInstance.getPluginList();
    }

    /**
     * Returns the definition of a plugin.
     *
     * @returns {*}
     */
    public static getPlugin(pluginName: string): any
    {
        return PluginManagerInstance.getPlugin(pluginName);
    }

    /**
     * Returns all registered plugin instances for the passed plugin name..
     *
     * @param {string} pluginName
     *
     * @returns {Map|null}
     */
    public static getPluginInstances(pluginName: string): Map<any, any>|null
    {
        return PluginManagerInstance.getPluginInstances(pluginName);
    }

    /**
     * Returns the plugin instance from the passed element selected by plugin Name.
     *
     * @param {HTMLElement} el
     * @param {String} pluginName
     *
     * @returns {Object|null}
     */
    public static getPluginInstanceFromElement(el: HTMLElement, pluginName: string): object | null
    {
        return PluginManagerSingleton.getPluginInstanceFromElement(el, pluginName);
    }

    /**
     * Returns all plugin instances from the passed element.
     *
     * @param {HTMLElement} el
     *
     * @returns {Map|null}
     */
    public static getPluginInstancesFromElement(el: HTMLElement): Map<any, any> | null
    {
        return PluginManagerSingleton.getPluginInstancesFromElement(el);
    }

    /**
     * Initializes all plugins which are currently registered.
     */
    public static initializePlugins(): void
    {
        PluginManagerInstance.initializePlugins();
    }

    /**
     * Initializes a single plugin.
     *
     * @param {Object} pluginName
     * @param {String|NodeList|HTMLElement} selector
     * @param {Object} options
     */
    public static initializePlugin(
        pluginName: object,
        selector: string | NodeList | HTMLElement,
        options: object
    ): void {
        PluginManagerInstance.initializePlugin(pluginName, selector, options);
    }
}

window.PluginManager = PluginManager;