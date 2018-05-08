import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs/Observable';
import {UserRoleCheckService} from '../../user/service/user-role-check.service';
import {ErrorService} from '../../error/error.service';
import {ConfigService} from '../../config/config.service';
import {Config} from '../../config/config';

@Injectable()
export class EventGuardService implements CanActivate {

    config: Config;

    constructor(private router: Router,
                private authService: AuthService,
                private userRoleCheckService: UserRoleCheckService,
                private errorService: ErrorService,
                private configService: ConfigService) {
        this.config = this.configService.getConfig();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log('in event role guard, url is: ' + state.url);

        const isLoggedIn = this.authService.isLoggedIn();
        if (!isLoggedIn) {
            this.router.navigate(['login']);
            return isLoggedIn;
        }
        return this.userRoleCheckService.hasRoles(['ROLE_ADMIN', 'ROLE_OBSERVER']).flatMap((hasObserverRole) => {
            console.log('in event guard, has observer role: ' + hasObserverRole);
            if (!hasObserverRole) {
                this.errorService.setError403(this.config.getFrontendUrl() + this.router.url);
                this.router.navigate(['error']);
            }
            return Observable.of(hasObserverRole);
        });
    }
}
