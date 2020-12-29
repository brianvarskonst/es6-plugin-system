export enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

export type RequestMethodsTypes = keyof typeof RequestMethods;