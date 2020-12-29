/**
* Plugin Registry
*
* contains all definitions for all plugins
*/
export default class PluginConfigRegistry {

    private registry: Map<any, any> = new Map();

    constructor()
    {}

    /**
     * adds a plugin to the registry
     *
     * @param {string} pluginName
     * @param {string} configName
     * @param {Object} config
     *
     * @returns {Map<any, any>}
     */
    public set(pluginName: string, configName: string, config: object): Map<any, any>
    {
        const pluginConfigs = this.createPluginConfigRegistry(pluginName);

        return pluginConfigs.set(configName, config);
    }

    /**
     * returns a config from the registry
     *
     * @param {string} pluginName
     * @param {string} configName
     *
     * @returns {any}
     */
    public get(pluginName: string, configName: string | boolean = false): any
    {
        const pluginConfigs = this.createPluginConfigRegistry(pluginName);

        if (configName && pluginConfigs.has(configName)) {
            return pluginConfigs.get(configName);
        } else if (configName) {
            throw new Error(`The config "${configName}" is not registered for the plugin "${pluginName}"!`);
        }

        return pluginConfigs;
    }

    /**
     * removes a config from the registry
     *
     * @param {string} pluginName
     * @param {string} configName
     *
     * @returns {PluginConfigRegistry}
     */
    public delete(pluginName: string, configName: string): PluginConfigRegistry
    {
        const pluginConfigs = this.createPluginConfigRegistry(pluginName);

        pluginConfigs.delete(configName);

        return this;
    }

    /**
     * clears the registry
     *
     * @returns {PluginConfigRegistry}
     */
    public clear(): PluginConfigRegistry
    {
        this.registry.clear();

        return this;
    }

    /**
     * creates the map for a plugin if not already existing
     * and returns it
     *
     * @param {string} pluginName
     *
     * @returns {Map<any, any>}
     */
    private createPluginConfigRegistry(pluginName) : Map<any, any>
    {
        if (!pluginName) {
            throw new Error('A plugin name must be given!');
        }

        if (!this.registry.has(pluginName)) {
            this.registry.set(pluginName, new Map());
        }

        return this.registry.get(pluginName);
    }

}