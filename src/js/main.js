/*
import polyfills
 */
import './helper/polyfill-loader.helper';

/*
import helpers
 */
import PluginManager from './plugin-system/plugin.manager';
import ViewportDetection from './helper/viewport-detection.helper';
import NativeEventEmitter from './helper/emitter.helper';

/*
import utils
 */
import TimezoneUtil from './utility/timezone/timezone.util';

window.eventEmitter = new NativeEventEmitter();

/*
initialisation
*/
new ViewportDetection();

/*
register plugins
*/


/*
run plugins
*/
document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === 'complete') {
        PluginManager.initializePlugins();
    }
}, false);

/*
run utils
*/

new TimezoneUtil();