import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

    error = '404: Not found!';

    getError(): string {
        return this.error;
    }

    setError404() {
        this.error = '404: Not found!';
    }

    setError403() {
        this.error = '403: Forbidden!';
    }
}
