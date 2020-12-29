import deepmerge from 'deepmerge';
import DomAccess from '../helper/dom-access.helper';
import StringHelper from '../helper/string.helper';
import NativeEventEmitter from '../helper/event/emitter.helper';
import {EventEmitter} from "../helper/event/emitter.interface";

/**
 * Plugin Base class
 */
export default class Plugin {

    private readonly el: HTMLElement;
    private $emitter: EventEmitter;
    private readonly pluginName: string | boolean;
    private readonly options: object;
    private initialized: boolean = false;

    /**
     * plugin constructor
     *
     * @param {HTMLElement} el
     * @param {Object} options
     * @param {string} pluginName
     */
    constructor(el: HTMLElement, options: object = {}, pluginName: string | boolean = false) {
        if (!DomAccess.isNode(el)) {
            throw new Error('There is no valid element given.');
        }

        this.el = el;
        this.$emitter = new NativeEventEmitter(this.el);
        this.pluginName = this.getPluginName(pluginName);
        this.options = this.mergeOptions(options);

        this.registerInstance();
        this.initPlugin();
    }

    /**
     * this function gets executed when the plugin is initialized
     */
    public init(): void {
        throw new Error(`The "init" method for the plugin "${this.pluginName}" is not defined.`);
    }

    /**
     * this function gets executed when the plugin is being updated
     */
    public update(): void {

    }

    /**
     * internal init method which checks
     * if the plugin is already initialized
     * before executing the public init
     *
     * @private
     */
    private initPlugin() {
        if (this.initialized) {
            return;
        }

        this.init();
        this.initialized = true;
    }

    /**
     * internal update method which checks
     * if the plugin is already initialized
     * before executing the public update
     *
     * @private
     */
    private updatePlugin() {
        if (!this.initialized) {
            return;
        }

        this.update();
    }

    /**
     * deep merge the passed options and the static defaults
     *
     * @param {Object} options
     */
    private mergeOptions(options: object): object
    {
        const dashedPluginName = StringHelper.toDashCase(this.pluginName);
        const dataAttributeConfig = DomAccess.getDataAttribute(
            this.el,
            `data-${dashedPluginName}-config`,
            false
        );

        const dataAttributeOptions = DomAccess.getAttribute(
            this.el,
            `data-${dashedPluginName}-options`,
            false
        );


        // static plugin options
        // previously merged options
        // explicit options when creating a plugin instance with 'new'
        const merge = [
            this.constructor.options,
            this.options,
            options,
        ];

        // options which are set via data-plugin-name-config="config name"
        if (dataAttributeConfig) {
            merge.push(window.PluginConfigManager.get(this.pluginName, dataAttributeConfig));
        }

        // options which are set via data-plugin-name-options="{json..}"
        try {
            if (dataAttributeOptions) {
                merge.push(JSON.parse(dataAttributeOptions));
            }
        } catch (e) {
            console.error(this.el);

            throw new Error(
                `The data attribute "data-${dashedPluginName}-options" could not be parsed to json: ${e.message}`
            );
        }

        return deepmerge.all(
            merge.map(config => config || {})
        );
    }

    /**
     * registers the plugin Instance to the element
     */
    private registerInstance(): void
    {
        const elementPluginInstances = window.PluginManager.getPluginInstancesFromElement(this.el);
        elementPluginInstances.set(this.pluginName, this);

        const plugin = window.PluginManager.getPlugin(this.pluginName, false);
        plugin.get('instances').push(this);
    }

    /**
     * returns the plugin name
     *
     * @param {string} pluginName
     *
     * @returns {string}
     */
    getPluginName(pluginName: string | boolean): string | boolean
    {
        if (!pluginName) {
            pluginName = this.constructor.name;
        }

        return pluginName;
    }

}