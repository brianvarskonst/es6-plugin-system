import {RequestMethods, RequestMethodsTypes} from "./request.methods.enum.service";

export default class HttpClient {

    public readonly requestedWithParameter = 'X-Requested-With';
    public readonly requestedWithDefaultValue = 'XMLHttpRequest';
    public readonly accessKeyParameter = 'access-key';
    public readonly contextTokenParameter = 'context-token';
    public readonly contentTypeParameter = 'Content-type';

    private request: XMLHttpRequest | null = null;
    private readonly accessKey: string;
    private readonly contextToken: string;
    private readonly csrfEnabled: boolean;
    private readonly csrfMode: string;
    private readonly generateUrl: string | null = null;

    public static GET = 'GET';

    /**
     * Constructor.
     * @param {string} accessKey
     * @param {string} contextToken
     * @param {boolean} csrfEnabled
     * @param {string} csrfMode
     * @param {Function} generateUrl
     */
    constructor(accessKey: string, contextToken: string, csrfEnabled: boolean, csrfMode: string, generateUrl: string|null) {
        this.request = null;
        this.accessKey = accessKey;
        this.contextToken = contextToken;
        this.csrfEnabled = csrfEnabled;
        this.csrfMode = csrfMode;
        this.generateUrl = generateUrl || null;
    }

    /**
     * @returns {string}
     */
    public get AccessKey(): string
    {
        return this.accessKey;
    }

    /**
     * @returns {string}
     */
    public get ContextToken(): string
    {
        return this.contextToken;
    }

    /**
     * Request GET
     *
     * @param {string} url
     * @param {function} callback
     * @param {string} contentType
     *
     * @returns {XMLHttpRequest}
     */
    public get(url: string, callback: Function, contentType: string = 'application/json'): XMLHttpRequest
    {
        const request = this.createPreparedRequest(RequestMethods.GET, url, contentType);

        this.registerOnLoaded(request, callback);

        request.send();

        return request;
    }

    /**
     * Request POST
     *
     * @param {string} url
     * @param {object|null} data
     * @param {function} callback
     * @param {string} contentType
     * @param {boolean} csrfProtected
     *
     * @returns {XMLHttpRequest}
     */
    public post(
        url: string,
        data?: object,
        callback?: Function,
        contentType: string|boolean = 'application/json',
        csrfProtected: boolean = true
    ): XMLHttpRequest {
        contentType = HttpClient.getContentType(data, contentType);

        const request = this.createPreparedRequest(RequestMethods.POST, url, contentType);

        if (csrfProtected && this.csrfEnabled && this.csrfMode === 'ajax') {
            this.fetchCsrfToken((csrfToken) => {
                if (data instanceof FormData) {
                    data.append('_csrf_token', csrfToken);
                } else {
                    data = JSON.parse(data);
                    data['_csrf_token'] = csrfToken;
                    data = JSON.stringify(data);
                }

                this.sendPostRequest(request, callback, data);
            });
            return request;
        }

        return this.sendPostRequest(request, callback, data);
    }

    /**
     * Request DELETE
     *
     * @param {string} url
     * @param {object|null} data
     * @param {function} callback
     * @param {string} contentType
     *
     * @returns {XMLHttpRequest}
     */
    public delete(url, data, callback, contentType = 'application/json') {
        contentType = HttpClient.getContentType(data, contentType);
        const request = this.createPreparedRequest(RequestMethods.DELETE, url, contentType);
        this.registerOnLoaded(request, callback);
        request.send(data);
        return request;
    }

    /**
     * Request PATCH
     *
     * @param {string} url
     * @param {object|null} data
     * @param {function} callback
     * @param {string} contentType
     *
     * @returns {XMLHttpRequest}
     */
    public patch(url, data, callback, contentType = 'application/json') {
        contentType = HttpClient.getContentType(data, contentType);
        const request = this.createPreparedRequest(RequestMethods.PATCH, url, contentType);

        this.registerOnLoaded(request, callback);

        request.send(data);

        return request;
    }

    /**
     * Abort running Request
     *
     * @returns {*}
     */
    public abort(): void
    {
        if (this.request) {
            return this.request.abort();
        }
    }

    public fetchCsrfToken(callback: Function): XMLHttpRequest
    {
        return this.post(
            this.generateUrl,
            null,
            response => callback(JSON.parse(response)['token']),
            'application/json',
            false
        );
    }

    private sendPostRequest(request: XMLHttpRequest, callback: Function, data: any): XMLHttpRequest
    {
        this.registerOnLoaded(request, callback);

        request.send(data);

        return request;
    }

    /**
     * register event listener
     * which executes the given callback
     * when the request has finished
     *
     * @param request
     * @param callback
     * @private
     */
    private registerOnLoaded(request: XMLHttpRequest, callback: Function) {
        request.addEventListener('loadend', () => {
            callback(request.responseText);
        });
    }

    /**
     * returns the appropriate content type for the request
     *
     * @param {*} data
     * @param {string} contentType
     *
     * @returns {string|boolean}
     * @private
     */
    private static getContentType(data: any, contentType: string | boolean): string | boolean
    {
        // when sending form data,
        // the content-type has to be automatically set,
        // to use the correct content-disposition
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition
        if (data instanceof FormData) {
            // @ts-ignore
            contentType = false;
        }

        return contentType;
    }

    /**
     * Returns a new and configured XMLHttpRequest object which
     * is prepared to being used
     *
     * @param {RequestMethodsTypes} type
     * @param {string} url
     * @param {string} contentType
     *
     * @returns {XMLHttpRequest}
     */
    private createPreparedRequest(
        type: RequestMethodsTypes,
        url: string,
        contentType: string
    ): XMLHttpRequest {
        this.request = new XMLHttpRequest();

        this.request.open(type, url);
        this.request.setRequestHeader(this.requestedWithParameter, this.requestedWithDefaultValue);
        this.request.setRequestHeader(this.accessKeyParameter, this.accessKey);
        this.request.setRequestHeader(this.contextTokenParameter, this.contextToken);

        if (contentType) {
            this.request.setRequestHeader(this.contentTypeParameter, contentType);
        }

        return this.request;
    }
}