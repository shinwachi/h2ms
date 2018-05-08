import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserEntityService} from '../../index';
import {UserEmailService} from './user-email.service';
import {ResourceUser} from '../../model/resourceUser';
import {AuthService} from '../../auth/auth.service';
import {Observable} from "rxjs/Observable";

/**
 * Similar to {@link UserEmailResolverService}, but it does not resolve before the page loads.
 * If this didn't exist, every route created would need to resolve the user email service each time.
 */
@Injectable()
export class LoggedInUserService {
    constructor(private userService: UserEntityService,
                private userEmailService: UserEmailService,
                private authService: AuthService) {
    }

    /**
     * @returns {Observable<ResourceUser>} an observable which resolves to the logged in user or
     * undefined if none is logged in.
     */
    getUser(): Observable<ResourceUser> {
        if (!this.authService.isLoggedIn()) {
            return Observable.of(undefined);
        }

        const email = this.userEmailService.getEmail();
        return this.userService.findOneByEmailUserUsingGET(email);
    }
}
