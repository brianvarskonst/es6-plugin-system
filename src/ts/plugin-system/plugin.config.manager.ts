import PluginConfigRegistry from './plugin.config.registry';

class PluginConfigManagerSingleton {

    private readonly registry: PluginConfigRegistry;

    constructor() {
        this.registry = new PluginConfigRegistry();
    }

    /**
     * returns the plugin config registry
     * or a direct config if a name is given
     *
     * @param {string} pluginName
     * @param {*|boolean} configName
     *
     * @returns {any}
     */
    public get(pluginName: string, configName: any | boolean = false): any
    {
        return this.registry.get(pluginName, configName);
    }

    /**
     * returns the plugin config registry
     * or a direct config if a name is given
     *
     * @param {string} pluginName
     * @param {*|boolean} configName
     * @param {*} config
     *
     * @returns {any}
     */
    public add(pluginName: string, configName: any | boolean, config: any): any
    {
        return this.registry.set(pluginName, configName, config);
    }

    /**
     * removes a config from the registry
     *
     * @param {string} pluginName
     * @param {*|boolean} configName
     *
     * @returns {any}
     */
    public remove(pluginName: string, configName: any | boolean): any
    {
        return this.registry.delete(pluginName, configName);
    }

    /**
     * returns the plugin registry
     *
     * @returns {Map<any, any>}
     */
    public getRegistry(): Map<any, any>
    {
        return this.registry
    }
}

/**
 * Create the PluginConfigManager instance.
 * @type {Readonly<PluginConfigManagerSingleton>}
 */
export const PluginConfigManagerInstance = Object.freeze(
    new PluginConfigManagerSingleton()
);

class PluginConfigManager {

    /**
     * returns the plugin config registry
     * or a direct config if a name is given
     *
     * @param {string} pluginName
     * @param {*|boolean} configName
     *
     * @returns {any}
     */
    public static get(pluginName: string, configName: any | boolean = false)
    {
        return PluginConfigManagerInstance.get(pluginName, configName);
    }

    /**
     * returns the plugin config registry
     * or a direct config if a name is given
     *
     * @param {string} pluginName
     * @param {*|boolean} configName
     * @param {*} config
     *
     * @returns {any}
     */
    public static add(pluginName: string, configName: any | boolean, config: any): any
    {
        return PluginConfigManagerInstance.add(pluginName, configName, config);
    }

    /**
     * removes a config from the registry
     *
     * @param {string} pluginName
     * @param {*|boolean} configName
     *
     * @returns {any}
     */
    public static remove(pluginName: string, configName: any | boolean): any
    {
        return PluginConfigManagerInstance.remove(pluginName, configName);
    }

    /**
     * returns the plugin registry
     *
     * @returns {Map<any, any>}
     */
    public static getRegistry(): Map<any, any>
    {
        return PluginConfigManagerInstance.getRegistry();
    }

}

window.PluginConfigManager = PluginConfigManager;