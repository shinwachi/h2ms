import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

    error403 = '403: Forbidden!';
    error404 = '404: Not found!';

    error: string;
    resource: string;

    constructor() {
        // default at start
        this.setError404(undefined);
    }

    getError(): string {
        return this.error;
    }

    setError404(resource: string) {
        this.error = this.error404;
    }

    setError403(resource: string) {
        this.resource = this.setResource(resource);
        this.error = this.error403;
    }

    getResource() {
        return this.resource;
    }

    private setResource(resource: string) {
        if (!this.error.match(this.error403)) {
            this.resource = '';
        } else {
            this.resource = 'You are not allowed to access the requested resource. '
                + 'Please see an administrator for details. ';
            if (resource) {
                this.resource += resource;
            }
        }
        return this.resource;
    }
}
