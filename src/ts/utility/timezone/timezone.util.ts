import CookieStorageHelper from './../../helper/storage/cookie-storage.helper';

export default class Timezone {

    public static cookie = 'timezone';

    /**
     * Constructor
     */
    constructor() {
        if (!CookieStorageHelper.isSupported()) {
            return;
        }

        CookieStorageHelper.setItem(
            Timezone.cookie,
            Intl.DateTimeFormat().resolvedOptions().timeZone,
            30
        );
    }

}