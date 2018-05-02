import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot} from '@angular/router';
import {ErrorService} from './error.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ErrorGuardService implements CanDeactivate<any> {

    constructor(private router: Router,
                private errorService: ErrorService) { }

    canDeactivate(component: any,
                  currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot) {
        // return to default on navigate away from page
        this.errorService.setError404(undefined);
        return Observable.of(true);
    }
}
