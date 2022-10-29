/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BasicRequest } from '../models/BasicRequest';
import type { TranslateResponse } from '../models/TranslateResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DefaultService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Translate
     * @param requestBody
     * @returns TranslateResponse Successful Response
     * @throws ApiError
     */
    public translatePost(
        requestBody: BasicRequest,
    ): CancelablePromise<TranslateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
